import { prisma } from "config/client";

const getProduct = async () => {
  const products = await prisma.product.findMany();
  return products;
};

const getProductById = async (id: number) => {
  return await prisma.product.findUnique({
    where: {
      id: id,
    },
  });
};

const addProductToCart = async (
  quantity: number,
  productId: number,
  user: Express.User
) => {
  const cart = await prisma.cart.findUnique({
    where: {
      userId: user.id,
    },
  });

  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (cart) {
    await prisma.cart.update({
      where: {
        id: cart.id,
      },
      data: {
        sum: {
          increment: quantity,
        },
      },
    });

    const currentCartDetail = await prisma.cartDetail.findFirst({
      where: {
        productId: productId,
        cartId: cart.id,
      },
    });

    await prisma.cartDetail.upsert({
      where: {
        id: currentCartDetail?.id ?? 0,
      },
      update: {
        quantity: {
          increment: quantity,
        },
      },
      create: {
        price: product.price,
        quantity: quantity,
        productId: productId,
        cartId: cart.id,
      },
    });
  } else {
    await prisma.cart.create({
      data: {
        userId: user.id,
        sum: quantity,
        cartDetails: {
          create: [
            {
              price: product.price,
              quantity: quantity,
              productId: productId,
            },
          ],
        },
      },
    });
  }
};

const getProductInCart = async (userId: number) => {
  const cart = await prisma.cart.findUnique({
    where: {
      userId: userId,
    },
  });
  if (cart) {
    const currentCartDetail = await prisma.cartDetail.findMany({
      where: {
        cartId: cart.id,
      },
      include: {
        product: true,
      },
    });
    return currentCartDetail;
  }
  return [];
};

const handleDeleteProductInCart = async (
  cartDetailId: string,
  userId: number,
  sumCart: number
) => {
  const currentCartDetail = await prisma.cartDetail.findUnique({
    where: {
      id: +cartDetailId,
    },
  });
  const quantity = currentCartDetail?.quantity;

  await prisma.cartDetail.delete({
    where: {
      id: +cartDetailId,
    },
  });

  if (sumCart === 1) {
    await prisma.cart.delete({
      where: {
        userId: userId,
      },
    });
  } else {
    await prisma.cart.update({
      where: {
        userId: userId,
      },
      data: {
        sum: {
          decrement: quantity,
        },
      },
    });
  }
};

const updateCartDetailBeforeCheckOut = async (
  data: { id: string; quantity: string }[],
  cartId: string
) => {
  let quantity = 0;

  for (let i = 0; i < data.length; i++) {
    quantity += +data[i].quantity;
    await prisma.cartDetail.update({
      where: {
        id: +data[i].id,
      },
      data: {
        quantity: +data[i].quantity,
      },
    });
  }

  await prisma.cart.update({
    where: {
      id: +cartId,
    },
    data: {
      sum: {
        set: quantity,
      },
    },
  });
};

const handlePlaceOrder = async (
  userId: number,
  receiverName: string,
  receiverAddress: string,
  receiverPhone: string,
  totalPrice: number
) => {
  try {
    await prisma.$transaction(async (tx) => {
      const cart = await tx.cart.findUnique({
        where: {
          userId: +userId,
        },
        include: {
          cartDetails: true,
        },
      });

      if (cart) {
        // create order
        const dataOrderDetails =
          cart?.cartDetails?.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })) ?? [];
        await tx.order.create({
          data: {
            receiverName,
            receiverAddress,
            receiverPhone,
            paymentMethod: "COD",
            paymentStatus: "PAYMENT_UNPAID",
            status: "PENDING",
            totalPrice: +totalPrice,
            userId,
            orderDetails: {
              create: dataOrderDetails,
            },
          },
        });

        // delete cart
        await tx.cartDetail.deleteMany({
          where: {
            cartId: cart.id,
          },
        });

        await tx.cart.delete({
          where: {
            id: cart.id,
          },
        });
      }

      //check product
      for (let i = 0; i < cart.cartDetails.length; i++) {
        const productId = cart.cartDetails[i].productId;

        const product = await tx.product.findUnique({
          where: {
            id: productId,
          },
        });
        if (!product || product.quantity < cart.cartDetails[i].quantity) {
          //update product quantity
          throw new Error(
            `Sản phẩm ${product?.name} không tồn tại hoặc số lượng không đủ`
          );
        }
        await tx.product.update({
          where: {
            id: productId,
          },
          data: {
            quantity: {
              decrement: cart.cartDetails[i].quantity,
            },
            sold: {
              increment: cart.cartDetails[i].quantity,
            },
          },
        });
      }
    });
    return "";
  } catch (error) {
    return error.message;
  }
  //create transaction
};

const handleGetOrdersHistory = async (userId: number) => {
  const orders = await prisma.order.findMany({
    where: {
      userId: +userId,
    },
    include: {
      orderDetails: {
        include: {
          product: true,
        },
      },
    },
  });

  return orders;
};
export {
  getProduct,
  getProductById,
  addProductToCart,
  getProductInCart,
  handleDeleteProductInCart,
  updateCartDetailBeforeCheckOut,
  handlePlaceOrder,
  handleGetOrdersHistory,
};
