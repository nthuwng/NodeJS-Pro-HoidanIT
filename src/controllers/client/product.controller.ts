import { Request, Response } from "express";
import { getProductById } from "services/client/item.services";

const getProductPage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const products = await getProductById(+id);
  return res.render("client/product/detail.ejs", { products });
};

export { getProductPage };
