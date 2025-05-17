import { Request, Response } from "express";
import {
  getAllUsers,
  handleCreateUser,
  handleDeleteUser,
  handleViewUser,
  handleUpdateUser,
} from "services/user.services";

const getHomePage = async (req: Request, res: Response) => {
  const users = await getAllUsers();
  return res.render("home", { users: users });
};

const getCreateUserPage = (req: Request, res: Response) => {
  return res.render("create-user.ejs");
};

const postCreateUser = async (req: Request, res: Response) => {
  const { fullName, email, address } = req.body;
  //handle create user
  await handleCreateUser(fullName, email, address);

  return res.redirect("/");
};

const postDeleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  await handleDeleteUser(id);

  return res.redirect("/");
};

const postUpdateUser = async (req: Request, res: Response) => {
  const { id, fullName, email, address } = req.body;
  await handleUpdateUser(id, fullName, email, address);

  return res.redirect("/");
};

const getViewUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const users = await handleViewUser(id);
  return res.render("view-user", { id: id, users: users });
};

export {
  getHomePage,
  getCreateUserPage,
  postCreateUser,
  postDeleteUser,
  getViewUser,
  postUpdateUser,
};
