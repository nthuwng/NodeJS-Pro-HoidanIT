import { Request, Response } from "express";

const isLogin = (req: Request, res: Response, next: Function) => {
  const isAuthenticated = req.isAuthenticated();

  if (isAuthenticated) {
    res.redirect("/");
    return;
  } else {
    next();
  }
};

const isAdmin = (req: Request, res: Response, next: Function) => {
  if (req.path.startsWith("/admin")) {
    const users = req.user as any;
    if (users?.role?.name === "ADMIN") {
      next();
    } else {
      res.render("status/403.ejs");
    }
    return;
  }
  next();
};
export { isLogin, isAdmin };
