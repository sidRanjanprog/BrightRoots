const express = require("express");
const cors = require("cors");

const childRoutes = require("./routes/childRoutes");
const authRoutes = require("./routes/authRoutes");
const screenTimeRoutes = require("./routes/screenTimeRoutes");
const sleepRoutes = require("./routes/sleepRoutes");
const outdoorActivityRoutes = require("./routes/outdoorActivityRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to BrightRoots API",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/children", childRoutes);
app.use("/api/screen-time", screenTimeRoutes);
app.use("/api/sleep", sleepRoutes);
app.use("/api/outdoor-activities", outdoorActivityRoutes);
app.use("/api/recommendations", recommendationRoutes);

module.exports = app;