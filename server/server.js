import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"; // Import CORS middleware
import userRoutes from "./routes/user.js";
import entryRoutes from "./routes/entry.js"; // Import entry routes

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5500;

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // Enable CORS for frontend origin
app.use(express.json());

// Routes
app.use("/api/users", userRoutes); // User routes for registration/login
app.use("/api/entries", entryRoutes); // Entry routes for create, read, update, delete

// MongoDB connection
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1); // Exit process with failure
    }
};

// Start the server
app.listen(PORT, async () => {
    await connect(); // Ensure MongoDB is connected before starting the server
    console.log(`Server running on http://localhost:${PORT}`);
});

// Debug logging to verify server setup
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
});

// Debug environment variable logging
console.log("MONGO_URI:", process.env.MONGO_URI); // Check MongoDB connection string
console.log("JWT Secret:", process.env.JWT); // Ensure JWT secret is loaded
