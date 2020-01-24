const mongoose = require("mongoose");
var idvalidator = require('mongoose-id-validator');
const User = require("../models/user");


const PostSchema = new mongoose.Schema({
  content: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

// PostSchema.pre('save', function (next) {
//   this.wasNew = this.isNew;
//   next();
// })

PostSchema.post('save', async function (doc) {
  console.log('%s has been saved', doc._id);
  // console.log('modify check', doc.isModified('documents.0.author'));

  try {
    await User.findOneAndUpdate({ _id: doc.author }, { $push: { posts: doc._id } });
  } catch (err) {
    console.log('error')
  }
});

PostSchema.plugin(idvalidator);

module.exports = mongoose.model("Post", PostSchema);