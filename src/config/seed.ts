import { prisma } from "config/client";

const initDatabase = async () => {
  const countUser = await prisma.user.count();
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
  } else {
    console.log("Database already initialized");
  }
};

export default initDatabase;
