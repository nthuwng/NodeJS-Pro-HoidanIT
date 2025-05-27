import { CartDetail } from "./../../../node_modules/.prisma/client/index.d";
import { Request, Response } from "express";
import {
  addProductToCart,
  getProductById,
  getProductInCart,
  handleDeleteProductInCart,
  handleGetOrdersHistory,
  handlePlaceOrder,
  updateCartDetailBeforeCheckOut,
} from "services/client/item.services";

const getProductPage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await getProductById(+id);

  return res.render("client/product/detail.ejs", { product });
};

const postAddProductToCart = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user;

  if (user) {
    await addProductToCart(1, +id, user);
  } else {
    return res.redirect("/login");
  }

  return res.redirect("/");
};

const getCartPage = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    return res.redirect("/login");
  }

  const cartDetails = await getProductInCart(user?.id);

  const totalPrice = cartDetails
    ?.map((item) => item.price * item.quantity)
    .reduce((a, b) => a + b, 0);

  const cartId = cartDetails.length ? cartDetails[0].cartId : 0;
  return res.render("client/product/cart.ejs", {
    cartDetails: cartDetails,
    totalPrice: totalPrice,
    cartId: cartId,
  });
};

const postDeleteProductInCart = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user;

  if (user) {
    await handleDeleteProductInCart(id, user.id, user.sumCart);
  } else {
    return res.redirect("/login");
  }

  return res.redirect("/cart");
};

const getCheckOutPage = async (req: Request, res: Response) => {
  const user = req.user;

  if (user) {
    const cartDetail = await getProductInCart(user.id);

    const totalPrice = cartDetail
      ?.map((item) => item.price * item.quantity)
      .reduce((a, b) => a + b, 0);
    return res.render("client/product/checkout.ejs", {
      cartDetails: cartDetail,
      totalPrice: totalPrice,
    });
  } else {
    return res.redirect("/login");
  }
};

const postHandleCartToCheckOut = async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    return res.redirect("/login");
  }

  const { cartId } = req.body;

  const currentCartDetail: { id: string; quantity: string }[] =
    req.body?.cartDetails ?? [];

  console.log("currentCartDetail", currentCartDetail);

  await updateCartDetailBeforeCheckOut(currentCartDetail, cartId);
  return res.redirect("/checkout");
};

const postPlaceOder = async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    return res.redirect("/login");
  }

  const { receiverName, receiverAddress, receiverPhone, totalPrice } = req.body;

  const message = await handlePlaceOrder(
    user.id,
    receiverName,
    receiverAddress,
    receiverPhone,
    totalPrice
  );

  if (message) {
    return res.redirect("/checkout");
  }
  return res.redirect("/thanks");
};

const getThanksPage = async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    return res.redirect("/login");
  }
  return res.render("client/product/thanks.ejs");
};

const getOrdersHistoryPage = async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    return res.redirect("/login");
  }

  const orders = await handleGetOrdersHistory(user.id);
  return res.render("client/product/orders.history.ejs", {
    orders: orders,
  });
};

const postAddToCartFromDetailPage = async (req: Request, res: Response) => {
  const id = req.params.id;

  const { quantity } = req.body;
  const user = req.user;

  if (!user) {
    return res.redirect("/login");
  }

  await addProductToCart(+quantity, +id, user);
  return res.redirect(`/product/${id}`);
};
export {
  getProductPage,
  postAddProductToCart,
  getCartPage,
  postDeleteProductInCart,
  getCheckOutPage,
  postHandleCartToCheckOut,
  postPlaceOder,
  getThanksPage,
  getOrdersHistoryPage,
  postAddToCartFromDetailPage,
};
