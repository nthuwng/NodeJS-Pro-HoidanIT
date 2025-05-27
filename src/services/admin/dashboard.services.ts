import { prisma } from "config/client";

const getDashBoardInfo = async () => {
  const userCount = await prisma.user.count();
  const productCount = await prisma.product.count();
  const orderCount = await prisma.order.count();

  return {
    userCount: userCount,
    productCount: productCount,
    orderCount: orderCount,
  };
};

export { getDashBoardInfo };
