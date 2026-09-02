import express from "express";
import authMiddleware from "../middleware/auth.js";
import { placeOrder, createRazorpayOrder, getUserOrders } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/create", authMiddleware, createRazorpayOrder);
orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/userorders", authMiddleware, getUserOrders);
orderRouter.get("/list", listOrders);
orderRouter.post("/status", updateStatus);

export default orderRouter;