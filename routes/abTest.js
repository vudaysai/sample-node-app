const express = require("express");
const router = express.Router();
const ABSample = require("../src/ABTestingSample");

router.get("/", async (req, res) => {
  try {
    var data = await ABSample.executeTest(req.query.id);
    res.json({ message: data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
