const express = require("express");
const app = express();
const cookieparser = require("cookie-parser");
const path = require("path");
const flash = require("connect-flash");
require("dotenv").config();

// Enable debug after dotenv loads
const debug = require("debug");
debug.enable(process.env.DEBUG || "");

const connectDB = require("./config/mongoose-connection");
const makelogger = require("./utils/loggers");
const serverlog = makelogger("server");

const ownersRouter = require("./routes/owenersRouter");
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");
const indexRouter = require("./routes/index");
const expsession = require("express-session");

connectDB();

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  expsession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_KEY,
  })
);

app.use(flash());
app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.listen(process.env.PORT, function () {
  serverlog("server is running");
});
