const mongoose = require("mongoose");
const moment = require("moment");

const reminderSchema = mongoose.Schema(
    {
        description: {
            type: String,
            required: [true, "Reminder must have description"],
        },
    },
    {
        timestamps: { createdAt: "addedAt", updatedAt: "modifiedAt" },
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

module.exports = mongoose.model("Reminders", reminderSchema);
