import { Request, Response } from "express";
import { getAllUsers, handleCreateUser } from "../services/user.services";

const getHomePage = async (req: Request, res: Response) => {
  const users = await getAllUsers();
  console.log("check list user: ", users);
  return res.render("home", { name: users });
};

const getCreateUserPage = (req: Request, res: Response) => {
  return res.render("create-user.ejs");
};

const postCreateUser = (req: Request, res: Response) => {
  const { fullName, email, address } = req.body;

  //handle create user
  handleCreateUser(fullName, email, address);

  return res.redirect("/");
};

export { getHomePage, getCreateUserPage, postCreateUser };
