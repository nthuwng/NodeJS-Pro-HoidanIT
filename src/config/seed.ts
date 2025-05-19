import { prisma } from "config/client";
import { hashPassword } from "services/user.services";
import { ACCOUNT_TYPE } from "config/constant";

const initDatabase = async () => {
  const countUser = await prisma.user.count();
  const countRole = await prisma.role.count();
  const defaultPassword = await hashPassword("123456");

  if (countUser === 0) {
    await prisma.user.createMany({
      data: [
        {
          fullName: "HungDev",
          username: "HungDev@gmail.com",
          password: defaultPassword,
          accountType: ACCOUNT_TYPE.SYSTEM,
        },
        {
          fullName: "Admin",
          username: "HungAdmin@gmail.com",
          password: defaultPassword,
          accountType: ACCOUNT_TYPE.SYSTEM,
        },
      ],
    });
  } else if (countRole === 0) {
    await prisma.role.createMany({
      data: [
        {
          name: "ADMIN",
          description: "Admin thì full quyền",
        },
        {
          name: "USER",
          description: "User thông thường",
        },
      ],
    });
  } else {
    console.log("Database already initialized");
  }
};

export default initDatabase;
