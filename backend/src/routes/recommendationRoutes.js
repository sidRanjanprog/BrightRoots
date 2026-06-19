const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getRecommendations,
  getDashboardInsights,
} = require("../controllers/recommendationController");

router.get("/dashboard/insights", protect, getDashboardInsights);
router.get("/:childId", protect, getRecommendations);

module.exports = router;