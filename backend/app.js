const express = require("express");
const cors = require("cors");


const reminderRoutes = require("./router/reminderRoutes");

// Initialization

const app = express();

//  Middlewares

app.use(express.json());
app.use(cors());

// API End-Points

app.use("/api/v1", reminderRoutes);

app.all("*", (req, res) => {
    res.status(404).json({
        message: `Can't find ${req.originalUrl} in this route`,
    });
});

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: err.stack,
    });
});

module.exports = app;
