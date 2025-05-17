import { prisma } from "config/client";
import getConnection from "config/database";

const handleCreateUser = async (
  fullName: string,
  email: string,
  address: string
) => {
  const newUser = await prisma.user.create({
    data: {
      name: fullName,
      email: email,
      address: address,
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
      name: fullName,
      email: email,
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

export {
  handleCreateUser,
  getAllUsers,
  handleDeleteUser,
  handleViewUser,
  handleUpdateUser,
};
