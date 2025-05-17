import { Request, Response } from "express";

const getDashBoardPage = async (req: Request, res: Response) => {
  return res.render("admin/dashboard");
};

export { getDashBoardPage };
