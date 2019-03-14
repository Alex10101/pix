const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: String,
  body: String,
  created_at: Date,
  updated_at: Date,
});

const File = mongoose.model('articles', articleSchema);

module.exports = File;
