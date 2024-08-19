import express from "express";
import {
  createOrganization,
  getOrganization,
  getOrganizations,
  deleteOrganization,
} from "../controllers/orgController.js";
import { verifyAccessToken } from "../Middlewares/TokenVerifiers.middleware.js";
import { addTokenToRequest } from "../Middlewares/TokenCheckers.middleware.js";

const router = express.Router();

router.post("/create", createOrganization);
router.get("/:id", addTokenToRequest,verifyAccessToken,getOrganization).delete("/:id", addTokenToRequest,verifyAccessToken,deleteOrganization);
router.get("/get/all", addTokenToRequest,verifyAccessToken,getOrganizations);

export default router;
