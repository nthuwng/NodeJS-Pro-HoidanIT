import express, { Express } from "express";
import {
  getCreateUserPage,
  getHomePage,
  postCreateUser,
  postDeleteUser,
  getViewUser,
  postUpdateUser,
} from "../controllers/user.controller";
import {
  getDashBoardPage,
  getAdminUserPage,
  getAdminOrderPage,
  getAdminProductPage,
  getAdminViewOder,
} from "controllers/admin/dashboard.controller";
import fileUploadMiddleware from "src/middleware/multer";
import {
  getCartPage,
  getCheckOutPage,
  getProductPage,
  postAddProductToCart,
  postDeleteProductInCart,
  postHandleCartToCheckOut,
  postPlaceOder,
  getThanksPage,
  getOrdersHistoryPage,
} from "controllers/client/product.controller";
import {
  getAdminCreateProductPage,
  postAdminCreateProduct,
  postDeleteProduct,
  getViewProduct,
  postUpdateProduct,
} from "controllers/admin/product.controller";
import {
  getLoginPage,
  getRegisterPage,
  getSuccessRedirectPage,
  postLogout,
  postRegisterPage,
} from "controllers/client/auth.controller";
import passport from "passport";
import { isAdmin, isLogin } from "src/middleware/auth";

const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const router = express.Router();

const webRoutes = (app: Express) => {
  router.get("/", getHomePage);
  router.get("/product/:id", getProductPage);
  router.get("/success-redirect", getSuccessRedirectPage);
  router.get("/login", getLoginPage);
  router.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/success-redirect",
      failureRedirect: "/login",
      failureMessage: true,
    })
  );
  router.post("/logout", postLogout);
  router.get("/register", getRegisterPage);
  router.post("/register", postRegisterPage);
  router.post("/add-product-to-cart/:id", postAddProductToCart);
  router.get("/cart", getCartPage);
  router.post("/delete-product-in-cart/:id", postDeleteProductInCart);
  router.post("/handle-cart-to-checkout", postHandleCartToCheckOut);
  router.get("/checkout", getCheckOutPage);
  router.post("/place-order", postPlaceOder);
  router.get("/thanks", getThanksPage);
  router.get("/order-history", getOrdersHistoryPage);


  //admin routes
  //user routes
  router.get("/admin", getDashBoardPage);
  router.get("/admin/user", getAdminUserPage);
  router.get("/admin/create-user", getCreateUserPage);
  router.post(
    "/admin/handle-create-user",
    fileUploadMiddleware("avatar"),
    postCreateUser
  );
  router.post("/admin/delete-user/:id", postDeleteUser);
  router.post(
    "/admin/update-user",
    fileUploadMiddleware("avatar"),
    postUpdateUser
  );
  router.get("/admin/view-user/:id", getViewUser);

  //product routes
  router.get("/admin/product", getAdminProductPage);
  router.get("/admin/create-product", getAdminCreateProductPage);
  router.post(
    "/admin/create-product",
    fileUploadMiddleware("image", "images/product"),
    postAdminCreateProduct
  );
  router.post("/admin/delete-product/:id", postDeleteProduct);
  router.post(
    "/admin/update-product",
    fileUploadMiddleware("image", "images/product"),
    postUpdateProduct
  );
  router.get("/admin/view-product/:id", getViewProduct);

  //order routes
  router.get("/admin/order", getAdminOrderPage);
  router.get("/admin/view-Order/:id", getAdminViewOder);


  app.use("/", isAdmin, router);
};

export default webRoutes;
