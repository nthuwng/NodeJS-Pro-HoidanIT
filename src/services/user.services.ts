import { prisma } from "config/client";
import { ACCOUNT_TYPE } from "config/constant";

const handleCreateUser = async (
  fullName: string,
  email: string,
  address: string,
  phone: string,
  avatar: string
) => {
  const newUser = await prisma.user.create({
    data: {
      fullName: fullName,
      username: email,
      address: address,
      password: "123456",
      accountType: ACCOUNT_TYPE.SYSTEM,
      avatar: avatar,
      phone: phone,
    },
  });
  return newUser;
};
const handleDeleteUser = async (id: string) => {
  const deleteUser = await prisma.user.delete({
    where: {
      id: +id,
    },
  });
  return deleteUser;
};

const handleUpdateUser = async (
  id: string,
  fullName: string,
  email: string,
  address: string
) => {
  const updateUser = await prisma.user.update({
    where: { id: +id },
    data: {
      fullName: fullName,
      username: email,
      address: address,
    },
  });
  return updateUser;
};

const handleViewUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: +id,
    },
  });
  return user;
};

const getAllUsers = async () => {
  const user = await prisma.user.findMany();
  return user;
};

const getAllRoles = async () => {
  const roles = await prisma.role.findMany();
  return roles;
};

export {
  handleCreateUser,
  getAllUsers,
  handleDeleteUser,
  handleViewUser,
  handleUpdateUser,
  getAllRoles,
};
