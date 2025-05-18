import { Request, Response } from "express";
import { getAllUsers } from "services/user.services";

const getDashBoardPage = async (req: Request, res: Response) => {
  return res.render("admin/dashboard/show.ejs");
};

const getUserPage = async (req: Request, res: Response) => {
  const users = await getAllUsers();
  return res.render("admin/user/show.ejs",{ users: users });
};

const getProductPage = async (req: Request, res: Response) => {
  return res.render("admin/product/show.ejs");
};

const getOrderPage = async (req: Request, res: Response) => {
  return res.render("admin/order/show.ejs");
};

export { getDashBoardPage, getUserPage, getProductPage, getOrderPage };
