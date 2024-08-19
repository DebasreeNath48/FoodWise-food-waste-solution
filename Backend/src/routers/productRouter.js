// routes/userRoutes.js
import express from 'express';
import { updateProducts, getAllProducts } from '../controllers/productController.js';
import { verifyAccessToken } from "../Middlewares/TokenVerifiers.middleware.js";
import { addTokenToRequest } from "../Middlewares/TokenCheckers.middleware.js";

const router = express.Router();

router.post('/update-products', addTokenToRequest,verifyAccessToken,updateProducts);
router.get('/get-products', addTokenToRequest,verifyAccessToken,getAllProducts);

export default router;