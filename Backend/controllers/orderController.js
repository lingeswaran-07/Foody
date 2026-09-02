import orderModel from "../models/orderModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.STRIPE_SECRET_KEY,
});

// Step 1: Create a Razorpay order (called before opening checkout)
const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount) {
      return res.status(400).json({ message: "Amount is required" });
    }

    const options = {
      amount: Math.round(amount * 100), // paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json({ order });
  } catch (error) {
    console.error("Error creating Razorpay order:", error.message);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Step 2: Verify payment signature and save order
const placeOrder = async (req, res) => {
  try {
    const {
      items,
      amount,
      address,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const userId = req.user.id;
    const user_email = req.user.email;

    if (
      !items ||
      !amount ||
      !address ||
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Verify signature to confirm payment authenticity
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.STRIPE_SECRET_KEY)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    const newOrder = new orderModel({
      userId,
      user_email,
      items,
      amount,
      address,
      payment: true,
    });

    await newOrder.save();
    res
      .status(201)
      .json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Error placing order:", error.message);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await orderModel.find({ userId });
    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching orders", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { createRazorpayOrder, placeOrder, getUserOrders };
