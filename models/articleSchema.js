const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: String,
  body: String,
  created_at: Number,
  updated_at: Number,
});

const File = mongoose.model('files', articleSchema);

module.exports = File;
