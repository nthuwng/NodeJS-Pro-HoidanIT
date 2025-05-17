import { Request, Response } from "express";

const getDashBoardPage = async (req: Request, res: Response) => {
  return res.render("admin/dashboard/show.ejs");
};

const getUserPage = async (req: Request, res: Response) => {
  return res.render("admin/user/show.ejs");
};

export { getDashBoardPage, getUserPage };
