import Entry from "../models/Entry.js";
import User from "../models/User.js";

// Create a new entry
export const createEntry = async (req, res, next) => {
  const newEntry = new Entry(req.body);

  try {
    // Save the entry
    const savedEntry = await newEntry.save();

    // Add the entry to the user's entries array
    await User.findByIdAndUpdate(
      savedEntry.author,
      { $push: { entries: savedEntry._id } },
      { new: true }
    );

    res.status(200).json(savedEntry);
  } catch (err) {
    // Return appropriate error for invalid data
    res.status(400).json({ message: "Failed to create entry", error: err.message });
  }
};

// Update an entry
export const updateEntry = async (req, res, next) => {
  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedEntry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    res.status(200).json(updatedEntry);
  } catch (err) {
    res.status(400).json({ message: "Failed to update entry", error: err.message });
  }
};

// Delete an entry
export const deleteEntry = async (req, res, next) => {
  try {
    // Delete the entry from the database
    const deletedEntry = await Entry.findByIdAndDelete(req.params.id);

    if (!deletedEntry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    // Remove the entry ID from the user's entries array
    await User.findOneAndUpdate(
      { entries: req.params.id },
      { $pull: { entries: req.params.id } },
      { new: true }
    );

    res.status(200).json({ message: "Entry deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Failed to delete entry", error: err.message });
  }
};

// Get all entries for a specific user
export const getEntries = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const entries = await Entry.find({ author: userId });

    if (!entries.length) {
      return res.status(404).json({ message: "No entries found for this user" });
    }

    res.status(200).json(entries);
  } catch (err) {
    res.status(400).json({ message: "Failed to fetch entries", error: err.message });
  }
};

// Get a single entry by ID
export const getEntry = async (req, res, next) => {
  try {
      console.log("Fetching entry with ID:", req.params.id);
      const entry = await Entry.findById(req.params.id);
      if (!entry) return res.status(404).json({ message: "Entry not found" });
      res.status(200).json(entry);
  } catch (err) {
      console.error(err);
      next(err);
  }
};
