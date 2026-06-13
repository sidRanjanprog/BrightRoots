const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createChild,
  getMyChildren,
  updateChild,
  deleteChild,
} = require("../controllers/childController");

router.post("/", protect, createChild);
router.get("/", protect, getMyChildren);
router.put("/:id", protect, updateChild);
router.delete("/:id", protect, deleteChild);

module.exports = router;