const express = require("express");
const router = express.Router();
const basicExample = require("../src/RuleEngine/basicExample");
const dynamicFacts = require("../src/RuleEngine/dynamicFacts");

router.post("/basic", async (req, res) => {
  console.log(req.body, "body");
  try {
    var data = await basicExample.checRule(req.body);
    res.json({ message: data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/dynamicFacts", async (req, res) => {
  console.log(req.body, "body");
  try {
    var data = await dynamicFacts.checRule(req.body);
    console.log(data);
    res.json({ message: data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
