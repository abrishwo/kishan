const express = require("express");
const {
  getReports,
  createReport,
} = require("../controllers/report.controller");
const { adminAuthGuard, authGuard } = require("../services/authGuard");
const router = express.Router();

// get
router.get("/", adminAuthGuard, getReports);

// post
router.post("/", authGuard, createReport);
// router.post("/remove", adminAuthGuard, resolveReport);
// router.post("/ignore", adminAuthGuard, ignoreReport);

module.exports = router;
