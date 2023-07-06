const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const UserRoutes = require("./routes/UserRoutes");
const auth = require("./routes/auth");

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch(`::::Database connection failed`);

app.use(express.json());
app.use("/api/user", UserRoutes);
app.use("/api/auth", auth);

app.listen(process.env.PORT || 2000, () => {
  console.log("Backend server is running");
});
