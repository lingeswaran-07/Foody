import foodModel from "../models/foodModel.js";

import fs from 'fs' 
import foodRouter from "../routes/foodRoute.js";

//add food-item
const addFood = async (req, res) => {
      try {
        // Log the incoming data to debug
        console.log("Request Body:", req.body);
        console.log("Uploaded File:", req.file);
    
        // Validate required fields
        if (!req.file) {
          console.error("No file uploaded");
          return res.status(400).json({ success: false, message: "Image is required" });
        }
        if (!req.body.name || !req.body.description || !req.body.price || !req.body.category) {
          console.error("Missing required fields");
          return res.status(400).json({ success: false, message: "All fields are required" });
        }
    
        // Save the file name (or full path, if needed)
        let image_filename = `${req.file.filename}`;
    
        // Create and save the food item
        const food = new foodModel({
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          category: req.body.category,
          image: image_filename,
        });
        await food.save();
        console.log("Food saved successfully:", food);
    
        // Send success response
        res.json({ success: true, message: "Food Added" });
      } catch (error) {
        console.error("Error saving food:", error);
        res.status(500).json({ success: false, message: "Error adding food" });
      }
    };
    
//all food list
const listFood = async(req,res)=>{
try{
   const foods = await foodModel.find({});
   res.json({success:true,data:foods})
}catch(error){
  console.log(error);
  res.json({success:false,message:"Error"})
}
}

//remove food items
const removeFood = async(req,res)=>{
try{
  const food = await foodModel.findById(req.body.id);
  fs.unlink(`upload/${food.image}`,()=>{})

  await foodModel.findByIdAndDelete(req.body.id);
  res.json({success:true,message:"Food Removed"})
}catch(error){
   console.log("Error");
   res.json({success:false,message:"Error"})
}
}
export {addFood,listFood,removeFood}