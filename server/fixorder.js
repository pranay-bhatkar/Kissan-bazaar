import mongoose from "mongoose";
import dotenv from "dotenv";
import OrderModel from "./models/order.model.js"; // Adjust the path based on your structure

dotenv.config(); // Load environment variables

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Connected to MongoDB");

    // Update incorrect enum values
    const result = await OrderModel.updateMany(
      { payment_status: "CASH ON DELIVERY" },
      { $set: { payment_status: "Cash on Delivery" } }
    );

    console.log(`Updated ${result.modifiedCount} orders.`);
    mongoose.disconnect();
  })
  .catch((err) => console.error("MongoDB connection error:", err));
