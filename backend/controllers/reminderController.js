const Reminder = require("../models/reminder");
const AppError = require("../utils/AppError");

exports.getReminders = async (req, res, next) => {
    let reminders;
    try {
        reminders = await Reminder.find();
    } catch (err) {
        return next(new AppError("Could not able to get reminders!", 400));
    }
    req.reminders = reminders;
    next();
};

exports.getAllReminders = async (req, res, next) => {
    res.status(200).json({
        message: "Success",
        results: req.reminders.length,
        reminders: req.reminders,
    });
};

exports.addReminder = async (req, res, next) => {
    const { description } = req.body;

    try {
        await Reminder({ description }).save();
    } catch (err) {
        return next(new AppError("Something Went Wrong!", 400));
    }

    res.status(201).json({
        status: "Success",
        message: "Created Successfully!",
        reminders: req.reminders,
    });
};

exports.updateReminder = async (req, res, next) => {
    const { id } = req.params;
    const { description } = req.body;
    let reminder;
    try {
        reminder = await Reminder.findById(id);
    } catch (err) {
        return next(new AppError("Something Went Wrong!", 400));
    }

    if (!reminder) {
        return next(new AppError("No document found with that ID", 404));
    }

    reminder.description = description;

    await reminder.save();

    try {
        req.reminders = await Reminder.find();
    } catch (err) {
        return next(new AppError(err?.message, 404));
    }

    res.status(200).json({
        status: "Success",
        message: "Updated Successfully!",
        reminders: req.reminders,
    });
};

exports.deleteReminder = async (req, res, next) => {
    const { id } = req.params;
    try {
        await Reminder.findById(id, (err, docs) => {
            docs.remove();
        });
    } catch (err) {
        return next(new AppError(err?.message, 404));
    }
    try {
        req.reminders = await Reminder.find();
    } catch (err) {
        return next(new AppError(err?.message, 404));
    }

    res.status(200).json({
        status: "Success",
        message: "Deleted Successfully",
        reminders: req.reminders,
    });
};
