require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const dbUrl = process.env.DATABASE_URL;

// change here
// mongoose.connect(dbUrl, {
//   useNewUrlParser: true
// });

const db = mongoose.connection;

db.on("error", error => console.error(error));
db.once("open", () => console.log("connected to database"));

app.use(express.json());

const subscribersRouter = require("./routes/subscribers");
const abTestRouter = require("./routes/abTest");

app.use("/subscribers", subscribersRouter);

app.use("/abtest", abTestRouter);

app.listen(3000, () => console.log("server started"));
