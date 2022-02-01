import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getaUser,
  getCurrentUser,
  loginUser,
  logoutUser,
  updateUser,
  updateUserPicture,
  updateUserRole,
} from "../controllers/userController";
import { authorizedRoles, isAuthenticated } from "../utils/isAuth";

const UserRoutes = Router();

UserRoutes.post("/create", createUser);
UserRoutes.post("/login", loginUser);
UserRoutes.get("/logout", logoutUser);

//Authenticated
UserRoutes.get("/me", isAuthenticated, getCurrentUser);
UserRoutes.put("/update/user", isAuthenticated, updateUser);
UserRoutes.put("/update/profile", isAuthenticated, updateUserPicture);
//admin
UserRoutes.get(
  "/admin/all",
  isAuthenticated,
  authorizedRoles("admin"),
  getAllUsers
);
UserRoutes.get(
  "/admin/:id",
  isAuthenticated,
  authorizedRoles("admin"),
  getaUser
);
UserRoutes.put(
  "/admin/:id",
  isAuthenticated,
  authorizedRoles("admin"),
  updateUserRole
);
UserRoutes.delete(
  "/admin/delete/:id",
  isAuthenticated,
  authorizedRoles("admin"),
  deleteUser
);

export default UserRoutes;
