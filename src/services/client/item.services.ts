import { prisma } from "config/client";

const getProduct = async () => {
  const products = await prisma.product.findMany();
  return products;
};

const getProductById = async (id: number) => {
  return await prisma.product.findUnique({
    where: {
      id: id,
    },
  });
};
export { getProduct, getProductById };
