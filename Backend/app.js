const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
dotenv.config();
const connectToDb = require("./db/db");
const userRoutes = require("./routes/user.route");
const morgan = require("morgan");
const captainRoutes = require("./routes/captain.routes");

connectToDb();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/users", userRoutes);
app.use("/captains", captainRoutes);

module.exports = app;
