import orderModel from "../models/orderModel.js";
import Stripe from "stripe";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Controller: Place Order
const placeOrder = async (req, res) => {
  try {
    const { items, amount, address, paymentMethodId } = req.body;
    const userId = req.user.id; // Assuming req.user is set by authMiddleware
    const user_email = req.user.email;

    if (!items || !amount || !address || !paymentMethodId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // convert to paisa/cents
      currency: "inr",
      payment_method: paymentMethodId,
      confirm: true,
    });

    if (paymentIntent.status !== "succeeded") {
      return res.status(402).json({ message: "Payment failed" });
    }

    // Save order to database
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      payment: true,
      user_email
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Error placing order:", error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Controller: Get User Orders
const getUserOrders = async (req, res) => {
  try {
    const user_email = req.body.email || req.user.email;
    const orders = await orderModel.find({ user_email });

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching orders", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { placeOrder, getUserOrders };
