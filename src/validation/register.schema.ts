import { isEmailExist } from "services/client/auth.services";
import { z } from "zod";

const passwordSchema = z
  .string()
  .min(3, { message: "Mật khẩu tối thiểu 3 ký tự" })
  .max(20, { message: "Mật khẩu tối đa 20 ký tự" });

const emailSchema = z
  .string()
  .email("Email không dúng dịnh dạng")
  .refine(
    async (email) => {
      const existingUser = await isEmailExist(email);
      return !existingUser;
    },
    {
      message: "Email đã tồn tại",
      path: ["email"],
    }
  );

export const RegisterSchema = z
  .object({
    fullName: z.string().trim().min(1, { message: "Tên không được để trống" }),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  });

export type TRegisterSchema = z.infer<typeof RegisterSchema>;
