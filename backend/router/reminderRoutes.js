const express = require("express");

const reminderController = require("../controllers/reminderController");

const router = express.Router();

// GET ALL REMINDERS

router.use(reminderController.getReminders);

router.get("/get-all-reminders", reminderController.getAllReminders);

// ADD REMINDER

router.post("/add-reminder", reminderController.addReminder);

// UPDATE REMINDER

router.patch("/update-reminder/:id", reminderController.updateReminder);

// DELETE REMINDER

router.delete("/delete-reminder/:id", reminderController.deleteReminder);

module.exports = router;
