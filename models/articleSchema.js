const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);

mongoose.connection.on('error', (err) => { console.error(err); process.exit(); });

const readURL = process.env.DB_READ || 'mongodb://dan:dan123@ds259806.mlab.com:59806/pix'
const writeURL = process.env.DB_WRITE || 'mongodb://dan:dan123@ds247347.mlab.com:47347/node'
const readConnection      = mongoose.createConnection(readURL);
const readWriteConnection = mongoose.createConnection(writeURL);

const articleSchema = new mongoose.Schema({
  title: String,
  body: String,
  created_at: Date,
  updated_at: Date,
});

exports.Readable = readConnection.model('articles', articleSchema);
exports.Writable = readWriteConnection.model('articles', articleSchema);
