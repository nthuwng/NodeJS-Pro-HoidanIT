import { prisma } from "config/client";

const createProduct = async (
  name: string,
  price: number,
  detailDesc: string,
  shortDesc: string,
  quantity: number,
  factory: string,
  target: string,
  imageUpload: string
) => {
  await prisma.product.create({
    data: {
      name,
      price,
      detailDesc,
      shortDesc,
      quantity,
      factory,
      target,
      ...(imageUpload && { image: imageUpload }),
    },
  });
};

const getProductList = async () => {
  return await prisma.product.findMany();
};

const handleDeleteProduct = async (id: string) => {
  const deleteProduct = await prisma.product.delete({
    where: {
      id: +id,
    },
  });
  return deleteProduct;
};

const handleViewProduct = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id: +id,
    },
  });
  return product;
};

const handleUpdateProduct = async (
  id: number,
  name: string,
  price: number,
  detailDesc: string,
  shortDesc: string,
  quantity: number,
  factory: string,
  target: string,
  imageUpload: string
) => {
  await prisma.product.update({
    where: { id },
    data: {
      name,
      price,
      detailDesc,
      shortDesc,
      quantity,
      factory,
      target,
      ...(imageUpload !== undefined && { image: imageUpload }),
    },
  });
};
export {
  createProduct,
  getProductList,
  handleDeleteProduct,
  handleViewProduct,
  handleUpdateProduct,
};
