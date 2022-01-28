import { Router } from "express";
import {
  createProduct,
  createReview,
  deleteProduct,
  deleteReview,
  getAllCategories,
  getAllProducts,
  getProduct,
  udpateProduct,
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
ProductsRoutes.put("/:productId", isAuthenticated, udpateProduct);
ProductsRoutes.post("/review", isAuthenticated, createReview);
ProductsRoutes.delete("/review", isAuthenticated, deleteReview);
ProductsRoutes.get("/categories", isAuthenticated, getAllCategories);

//ALL USERS AREA
ProductsRoutes.get("/", getAllProducts);
ProductsRoutes.get("/:productId", getProduct);

export default ProductsRoutes;
