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
  getUserPage,
  getOrderPage,
  getProductPage,
} from "controllers/admin/dashboard.controller";
import fileUploadMiddleware from "src/middleware/multer";

const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const router = express.Router();

const webRoutes = (app: Express) => {
  router.get("/", getHomePage);

  router.post("/handle-delete-user/:id", postDeleteUser);
  router.get("/handle-view-user/:id", getViewUser);
  router.post("/handle-update-user", postUpdateUser);

  //admin routes
  router.get("/admin", getDashBoardPage);
  router.get("/admin/user", getUserPage);
  router.get("/admin/create-user", getCreateUserPage);
  router.post(
    "/admin/handle-create-user",
    fileUploadMiddleware("avatar"),
    postCreateUser
  );

  router.get("/admin/order", getOrderPage);
  router.get("/admin/product", getProductPage);

  app.use("/", router);
};

export default webRoutes;
