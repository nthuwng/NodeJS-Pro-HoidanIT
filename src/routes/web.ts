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
} from "controllers/admin/dashboard.controller";
import fileUploadMiddleware from "src/middleware/multer";
import { getProductPage } from "controllers/client/product.controller";
import {
  getAdminCreateProductPage,
  postAdminCreateProduct,
  postDeleteProduct,
  getViewProduct,
  postUpdateProduct,
} from "controllers/admin/product.controller";
import { getLoginPage,getRegisterPage,postRegisterPage } from "controllers/client/auth.controller";

const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const router = express.Router();

const webRoutes = (app: Express) => {
  router.get("/", getHomePage);
  router.get("/product/:id", getProductPage);
  router.get("/login", getLoginPage);
  router.get("/register", getRegisterPage);
  router.post("/register", postRegisterPage);


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

  app.use("/", router);
};

export default webRoutes;
