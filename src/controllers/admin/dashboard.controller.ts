import { Request, Response } from "express";
import { getDashBoardInfo } from "services/admin/dashboard.services";
import {
  getAllOrders,
  getAllOrdersDetail,
} from "services/admin/order.services";
import { getProductList } from "services/admin/product.services";
import { getAllUsers } from "services/user.services";

const getDashBoardPage = async (req: Request, res: Response) => {
  const info = await getDashBoardInfo();
  console.log(info);

  return res.render("admin/dashboard/show.ejs", { info: info });
};

const getAdminUserPage = async (req: Request, res: Response) => {
  const { page } = req.query;
  let currentPage = page ? +page : 1;
  if (currentPage <= 0) currentPage = 1;

  const users = await getAllUsers(currentPage);
  return res.render("admin/user/show.ejs", { users: users });
};

const getAdminProductPage = async (req: Request, res: Response) => {
  const products = await getProductList();
  return res.render("admin/product/show.ejs", { products });
};

const getAdminOrderPage = async (req: Request, res: Response) => {
  const Orders = await getAllOrders();

  return res.render("admin/order/show.ejs", { Orders: Orders });
};

const getAdminViewOder = async (req: Request, res: Response) => {
  const id = req.params.id;

  const OrderDetails = await getAllOrdersDetail(id);

  return res.render("admin/order/detail.ejs", {
    OrderDetails: OrderDetails,
    id: id,
  });
};

export {
  getDashBoardPage,
  getAdminUserPage,
  getAdminOrderPage,
  getAdminProductPage,
  getAdminViewOder,
};
