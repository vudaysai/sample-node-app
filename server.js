require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const dbUrl = process.env.DATABASE_URL;

mongoose.connect(dbUrl, {
  useNewUrlParser: true
});

const db = mongoose.connection;

db.on("error", error => console.error(error));
db.once("open", () => console.log("connected to database"));

app.use(express.json());

const subscribersRouter = require("./routes/subscribers");
app.use("/subscribers", subscribersRouter);

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

const postsRouter = require("./routes/posts");
app.use("/posts", postsRouter);

app.listen(3000, () => console.log("server started"));
