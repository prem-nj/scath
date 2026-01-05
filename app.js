const express = require("express");
const app = express();
const cookieparser = require("cookie-parser");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./config/mongoose-connection");

const ownersRouter = require("./routes/owenersRouter");
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");

dotenv.config();
connectDB();

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.listen(process.env.PORT, function () {
  console.log("server is running");
});
