import { Request, Response } from "express";
import {
  countTotalProductClientPage,
  getProduct,
} from "services/client/item.services";
import {
  getAllUsers,
  handleCreateUser,
  handleDeleteUser,
  handleUpdateUser,
  getAllRoles,
  getUserById,
} from "services/user.services";

const getHomePage = async (req: Request, res: Response) => {
  const { page } = req.query;

  let currentPage = page ? +page : 1;
  if (currentPage <= 0) {
    currentPage = 1;
  }

  const totalPages = await countTotalProductClientPage(8);
  const products = await getProduct(currentPage, 8);

  return res.render("client/home/show.ejs", {
    products,
    totalPages: +totalPages,
    page: +currentPage,
  });
};

const getCreateUserPage = async (req: Request, res: Response) => {
  const roles = await getAllRoles();
  return res.render("admin/user/create.ejs", { roles: roles });
};

const postCreateUser = async (req: Request, res: Response) => {
  const { fullName, username, phone, role, address } = req.body;
  console.log("req.body", req.body);
  const file = req.file;
  const avatar = file?.filename ?? "";
  //handle create user
  await handleCreateUser(fullName, username, address, phone, avatar, role);

  return res.redirect("/admin/user");
};

const postDeleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  await handleDeleteUser(id);

  return res.redirect("/admin/user");
};

const postUpdateUser = async (req: Request, res: Response) => {
  const { id, fullName, username, phone, role, address } = req.body;
  console.log("req.body", req.body);
  const file = req.file;
  const avatar = file?.filename ?? undefined;

  await handleUpdateUser(id, fullName, phone, role, address, avatar);

  return res.redirect("/admin/user");
};

const getViewUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const roles = await getAllRoles();

  const users = await getUserById(id);
  return res.render("admin/user/detail.ejs", {
    id: id,
    users: users,
    roles: roles,
  });
};

const getProductsFilterPage = async (req: Request, res: Response) => {
  const { page } = req.query;

  let currentPage = page ? +page : 1;
  if (currentPage <= 0) {
    currentPage = 1;
  }

  const totalPages = await countTotalProductClientPage(6);
  const products = await getProduct(currentPage, 6);

  return res.render("client/home/filter.ejs", {
    products,
    totalPages: +totalPages,
    page: +currentPage,
  });
};

export {
  getHomePage,
  getCreateUserPage,
  postCreateUser,
  postDeleteUser,
  getViewUser,
  postUpdateUser,
  getProductsFilterPage,
};
