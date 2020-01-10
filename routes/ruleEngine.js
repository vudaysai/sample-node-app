const express = require("express");
const router = express.Router();
const ruleEngine = require("../src/ruleEngine");

router.post("/", async (req, res) => {
  console.log(req.body, "body");
  try {
    var data = await ruleEngine.checRule(req.body);
    console.log(data, "in route");
    res.json({ message: data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
