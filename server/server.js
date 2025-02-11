import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.js";
import entryRoutes from "./routes/entry.js";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5500;

// Middleware
const allowedOrigins = [
    "http://localhost:3000", // Development
    "https://your-frontend-url.com" // Production
];
app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
);
app.use(express.json()); // Parse incoming JSON data

// Routes
app.use("/api/users", userRoutes); // User routes for registration and login
app.use("/api/entries", entryRoutes); // Entry routes for CRUD operations

// MongoDB connection
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1); // Exit process with failure
    }
};

// Start the server
app.listen(PORT, async () => {
    await connect(); // Ensure MongoDB is connected before starting the server
    console.log(`Server running on port: ${PORT}`);
});

// Debug logging for requests (only in development)
if (process.env.NODE_ENV !== "production") {
    app.use((req, res, next) => {
        console.log(`[${req.method}] ${req.url}`);
        next();
    });

    // Debugging environment variables
    console.log("MONGO_URI:", process.env.MONGO_URI);
    console.log("JWT Secret:", process.env.JWT);
}
