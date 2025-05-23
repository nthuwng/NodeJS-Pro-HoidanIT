import { prisma } from "config/client";
import { ACCOUNT_TYPE } from "config/constant";
import { comparePassword, hashPassword } from "services/user.services";

const isEmailExist = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username: email,
    },
  });
  if (user) {
    return true;
  }
  return false;
};

const registerNewUser = async (
  fullName: string,
  email: string,
  password: string
) => {
  const newPassword = await hashPassword(password);

  const userRole = await prisma.role.findUnique({
    where: { name: "USER" },
  });

  if (userRole) {
    await prisma.user.create({
      data: {
        username: email,
        password: newPassword,
        fullName: fullName,
        accountType: ACCOUNT_TYPE.SYSTEM,
        roleId: userRole.id,
      },
    });
  }
};

const getUserWithRolesById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: +id,
    },
    include: {
      role: true,
    },
    omit: {
      password: true,
    },
  });
  return user;
};

export { isEmailExist, registerNewUser,getUserWithRolesById };
