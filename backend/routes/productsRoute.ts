import { Router } from "express";
import {
  createProduct,
  createReview,
  deleteProduct,
  deleteReview,
  getAllCategories,
  getAllProducts,
  getProduct,
  updateProduct,
  updateProductStock,
} from "../controllers/productController";
import { authorizedRoles, isAuthenticated } from "../utils/isAuth";

const ProductsRoutes = Router();

//ADMIN AREA
ProductsRoutes.post(
  "/admin/new",
  isAuthenticated,
  authorizedRoles("admin"),
  createProduct
);

ProductsRoutes.delete(
  "/admin/:productId",
  isAuthenticated,
  authorizedRoles("admin"),
  deleteProduct
);

//AUTHENTICATED AREA
ProductsRoutes.put("/stock", isAuthenticated, updateProductStock);
ProductsRoutes.put("/:productId", isAuthenticated, updateProduct);
ProductsRoutes.post("/review", isAuthenticated, createReview);
ProductsRoutes.delete("/review", isAuthenticated, deleteReview);

//ALL USERS AREA
ProductsRoutes.get("/categories", getAllCategories);
ProductsRoutes.get("/", getAllProducts);
ProductsRoutes.get("/:productId", getProduct);

export default ProductsRoutes;
