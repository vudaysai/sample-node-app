const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const User = require("../models/user");

// Get all subscribers
router.get("/", async (req, res) => {
  try {
    const subscribers = await Post.find();
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create one subscriber
router.post("/", async (req, res) => {
  const subscriber = new Post({
    content: req.body.name,
    author: req.body.author
  });

  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get one subscriber
router.get("/:id", getSubscriber, (req, res) => {
  res.json(res.subscriber);
});

// Update one subscriber
router.patch("/:id", getSubscriber, async (req, res) => {
  if (req.body.name != null) {
    res.subscriber.content = req.body.name;
  }

  // if (req.body.subscribedChannel != null) {
  //   res.subscriber.subscribedChannel = req.body.subscribedChannel;
  // }
  try {
    const updatedSubscriber = await res.subscriber.save();
    res.json(updatedSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete one subscriber
router.delete("/:id", getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove();
    res.json({ message: "Deleted This Subscriber" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// function to fetch single subscriber
async function getSubscriber(req, res, next) {
  try {
    subscriber = await Post.findById(req.params.id);
    if (subscriber == null) {
      return res.status(404).json({ message: "Cant find subscriber" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.subscriber = subscriber;
  next();
}

module.exports = router;
