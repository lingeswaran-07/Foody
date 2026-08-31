import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"
import Stripe from "stripe"

const stripe = new Stripe(process.env)

//placing user orderfrom frontend
const placeOrder = async (req,res)=>{
  
}
export {placeOrder}