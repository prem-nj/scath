const mongoose = require("mongoose");

const makelogger=require("../utils/loggers");

const dbgr=makelogger("db:mongoose");

const config=require("config");

const connectDB = async () => {
  try {
    await mongoose.connect(config.get("MONGODB_URI"));

    dbgr(` MongoDB Connected: ${mongoose.connection.host}/`);
  } catch (error) {
      dbgr(" MongoDB connection FAILED:", error.message);
      throw error;
  }
};

const db = mongoose.connection;

db.on("error", (err) => {
  console.error(" Mongoose default connection error:", err);
});

db.on("disconnected", () => {
  console.warn(" Mongoose default connection disconnected");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log(" MongoDB connection closed through app termination");
  process.exit(0);
});

module.exports = connectDB;
