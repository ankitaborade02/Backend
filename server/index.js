import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import userRoute from "./routes/user.js"; // Assuming this is correct
import entryRoute from "./routes/entry.js"; // Correctly importing entry route
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5500;

// MongoDB Connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

// MongoDB Events
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});

// Test route
app.get('/', (req, res) => { res.send('Hello from Express!') });

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(cors({
   origin: "http://localhost:3000", // Frontend origin
   credentials: true,
}));
app.use(morgan("common"));

// Routes
app.use("/api/users", userRoute);
app.use("/api/entries", entryRoute); // Use the entry route for entries

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  connect(); // Connect to MongoDB when the server starts
});
