import { Request, Response } from "express";
import {
  getAllUsers,
  handleCreateUser,
  handleDeleteUser,
  handleViewUser,
  handleUpdateUser,
  getAllRoles,
} from "services/user.services";

const getHomePage = async (req: Request, res: Response) => {
  const users = await getAllUsers();
  return res.render("home", { users: users });
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

  const users = await handleViewUser(id);
  return res.render("admin/user/detail.ejs", {
    id: id,
    users: users,
    roles: roles,
  });
};

export {
  getHomePage,
  getCreateUserPage,
  postCreateUser,
  postDeleteUser,
  getViewUser,
  postUpdateUser,
};
