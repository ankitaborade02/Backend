import express from "express";
import {
    createEntry,
    deleteEntry,
    getEntries,
    updateEntry,
    getEntry,
} from "../controllers/entry.js";

const router = express.Router();

// Create a new entry
router.post("/", createEntry);

// Update an existing entry by ID
router.put("/:id", updateEntry);

// Delete an entry by ID
router.delete("/:id", deleteEntry);

// Get all entries by a specific author (userId)
router.get("/author/:userId", getEntries);

// Get a single entry by ID
router.get("/:id", getEntry);

export default router;
