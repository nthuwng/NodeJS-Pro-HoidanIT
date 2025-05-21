import { Request, Response } from "express";
import { getProductList } from "services/admin/product.services";
import { getAllUsers } from "services/user.services";

const getDashBoardPage = async (req: Request, res: Response) => {
  return res.render("admin/dashboard/show.ejs");
};

const getAdminUserPage = async (req: Request, res: Response) => {
  const users = await getAllUsers();
  return res.render("admin/user/show.ejs", { users: users });
};

const getAdminOrderPage = async (req: Request, res: Response) => {
  return res.render("admin/order/show.ejs");
};

const getAdminProductPage = async (req: Request, res: Response) => {
  const products = await getProductList();
  return res.render("admin/product/show.ejs", { products });
};

export {
  getDashBoardPage,
  getAdminUserPage,
  getAdminOrderPage,
  getAdminProductPage,
};
