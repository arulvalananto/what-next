const mongoose = require("mongoose");

process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION", err.name);
    console.log(err.message);
    console.log(err.stack)
    process.exit(1);
});

const app = require("./app");
require("dotenv").config({ path: "./config/.env" });

const port = process.env.PORT || 5002;

// MONGOOSE CONNECTION

mongoose
    .connect(process.env.MONGO_URI, {
        useCreateIndex: true,
        useFindAndModify: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB CONNECTED");
    });

// Listening on PORT

app.listen(port, () => {
    console.log("Listening on PORT", port);
});
