import { Request, Response } from "express";
import { registerNewUser } from "services/client/auth.services";
import { RegisterSchema } from "src/validation/register.schema";

const getLoginPage = (req: Request, res: Response) => {
  const { session } = req as any;
  const messages = session?.messages ?? [];
  return res.render("client/auth/login.ejs", { messages });
};

const getRegisterPage = (req: Request, res: Response) => {
  return res.render("client/auth/register.ejs");
};

const postRegisterPage = async (req: Request, res: Response) => {
  const { fullName, email, password, confirmPassword } = req.body;

  const validate = await RegisterSchema.safeParseAsync(req.body);
  if (!validate.success) {
    const errorsZod = validate.error.issues;
    const errors = errorsZod.map((item) => `${item.message} ${item.path[0]}`);

    const oldData = {
      fullName,
      email,
      password,
      confirmPassword,
    };
    return res.render("client/auth/register.ejs", { errors, oldData });
  }

  await registerNewUser(fullName, email, password);

  return res.redirect("/login");
};

export { getLoginPage, getRegisterPage, postRegisterPage };
