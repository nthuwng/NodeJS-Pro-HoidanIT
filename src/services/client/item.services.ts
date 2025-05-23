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
          decrement: 1,
        },
      },
    });
  }
};
export {
  getProduct,
  getProductById,
  addProductToCart,
  getProductInCart,
  handleDeleteProductInCart,
};
