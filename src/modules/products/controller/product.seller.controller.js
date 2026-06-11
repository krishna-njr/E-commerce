import { asyncWrapper } from "../../../../utils/asyncWrapper.js";
import * as productService from "../service/product.service.js";

export const getSellerProductsFiltered = asyncWrapper(async (req, res) => {
  const filters = {
    ...req.query,
    sellerId: req.user.id,
  };

  const products = await productService.filterProductsService(filters);
  res
    .status(200)
    .json({ success: true, count: products.length, data: products });
});
