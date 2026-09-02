import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://lingeswaran:lingeswaran7@cluster1.p3ooygz.mongodb.net/Food?appName=Cluster1" ||
        process.env.MONGO_URI,
    );
    console.log("DB Connected");
  } catch (error) {
    console.error("Connection failed:", error.message);
  }
};
