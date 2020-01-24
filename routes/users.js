const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Post = require("../models/post");

// Get all subscribers
router.get("/", async (req, res) => {
  try {
    const subscribers = await User.find().select(['-posts'])
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// router.get("/:id/posts", async (req, res) => {
//   try {
//     const subscribers = await Post.find({ author: req.params.id })
//     res.json(subscribers);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// Create one subscriber
router.post("/", async (req, res) => {
  const subscriber = new User({
    username: req.body.username,
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
    res.subscriber.name = req.body.name;
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
    subscriber = await User.findById(req.params.id).populate('posts', 'content');;
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
