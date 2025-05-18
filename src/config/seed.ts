import { prisma } from "config/client";

const initDatabase = async () => {
  const countUser = await prisma.user.count();
  const countRole = await prisma.role.count();

  if (countUser === 0) {
    await prisma.user.createMany({
      data: [
        {
          username: "HungDev@gmail.com",
          password: "123",
          accountType: "SYSTEM",
        },
        {
          username: "HungAdmin@gmail.com",
          password: "123",
          accountType: "SYSTEM",
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
