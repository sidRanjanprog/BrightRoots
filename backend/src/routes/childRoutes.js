const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createChild,
  getMyChildren,
  getChildById,
  updateChild,
  deleteChild,
} = require("../controllers/childController");

router.post("/", protect, createChild);
router.get("/", protect, getMyChildren);
router.get("/:id", protect, getChildById);
router.put("/:id", protect, updateChild);
router.delete("/:id", protect, deleteChild);

module.exports = router;
