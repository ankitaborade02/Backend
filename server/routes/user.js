import express from "express";
import { register, login, deleteUser } from "../controllers/user.js";

const router = express.Router();

// Register a new user
router.post("/register", register);

// Login a user
router.post("/login", login);

// Delete a user by ID
router.delete("/:id", deleteUser);




export default router;
