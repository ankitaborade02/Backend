import mongoose from "mongoose";

const EntrySchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true, // Ensures that an entry must always have an author
        },
        title: {
            type: String,
            required: [true, "Title is required"], // Custom error message
            trim: true, // Removes unnecessary whitespace
        },
        location: {
            type: String,
            required: [true, "Location is required"],
            trim: true,
        },
        date: {
            type: Date, // Use the correct Date type for better date handling
            required: [true, "Date is required"],
        },
        photos: {
            type: [String],
            default: [], // Ensures photos is always an array
        },
        text: {
            type: String,
            required: [true, "Text is required"],
            trim: true,
        },
    },
    { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

export default mongoose.model("Entry", EntrySchema);
