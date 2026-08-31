import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
const addtoCart = async (req, res) => {
    try {
        const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET);
        const userId = decoded.id;

        let userData = await userModel.findById(userId);
        let cartData = userData.cartData || {};

        const itemId = req.body.itemid;  // unified lowercase

        if (!cartData[itemId]) {
            cartData[itemId] = 1;
        } else {
            cartData[itemId] += 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Added to the cart" });
    } catch (error) {
        console.error("Error in addtoCart:", error);
        res.status(500).json({ success: false, message: "Error adding to cart" });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET);
        const userId = decoded.id;

        let userData = await userModel.findById(userId);
        let cartData = userData.cartData || {};

        const itemId = req.body.itemid;

        if (cartData[itemId] && cartData[itemId] > 0) {
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0) {
                delete cartData[itemId];
            }
        }

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Removed from cart" });
    } catch (error) {
        console.error("Error in removeFromCart:", error);
        res.status(500).json({ success: false, message: "Error removing from cart" });
    }
};

const getCart = async (req, res) => {
    try {
        const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET);
        const userId = decoded.id;

        let userData = await userModel.findById(userId);
        let cartData = userData.cartData || {};
        res.json({ success: true, cartData });
    } catch (error) {
        console.error("Error in getCart:", error);
        res.status(500).json({ success: false, message: "Error fetching cart" });
    }
};

export { addtoCart, removeFromCart, getCart };
