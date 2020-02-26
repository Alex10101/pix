const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);

mongoose.connection.on('error', (err) => { console.error(err); process.exit(); });

const resendURL = 'mongodb://127.0.0.1:27017/pix'

const resendConnection = mongoose.createConnection(resendURL);

const articleSchema = new mongoose.Schema({
  title: String,
  body: String,
  created_at: Date,
  updated_at: Date,
});

const Article = resendConnection.model('articles', articleSchema);

function Mock(i, res) {
  let article = new Article({
    title: i,
    body: i,
    created_at: new Date()
  });
  article.save((err, data) => res && res())
}

let i = 10

while(i--) {
  // Mock(i)
}

Article.find().exec((err, data) => console.log(data))