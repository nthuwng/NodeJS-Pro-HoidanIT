import { prisma } from "config/client";

const getAllOrders = async () => {
  const orders = await prisma.order.findMany({
    include: {
      user: true,
    },
  });
  return orders;
};

const getAllOrdersDetail = async (id: string) => {
  const ordersDetail = await prisma.orderDetail.findMany({
    where: {
      orderId: +id,
    },
    include: {
      product: true,
    },
  });
  return ordersDetail;
};

export { getAllOrders, getAllOrdersDetail };
