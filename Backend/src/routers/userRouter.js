import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
  refresh,
  updateChat,
  fetchAllChats,
} from "../controllers/userController.js";
import { addTokenToRequest } from "../Middlewares/TokenCheckers.middleware.js";
import { verifyAccessToken, verifyRefreshToken } from "../Middlewares/TokenVerifiers.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", addTokenToRequest,logoutUser);
router.get("/profile", addTokenToRequest,verifyAccessToken,getProfile);
router.get("/refresh",addTokenToRequest,verifyRefreshToken,refresh)
router.post("/update-chat",addTokenToRequest,verifyAccessToken,updateChat)
router.post("/get-chat",addTokenToRequest,verifyAccessToken,fetchAllChats)

export default router;
