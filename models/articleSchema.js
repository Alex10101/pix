const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);

mongoose.connection.on('error', (err) => { console.error(err); process.exit(); });

const URL = process.env.DB || 'mongodb://127.0.0.1:27017/pix'
const connection = mongoose.createConnection(URL);

const articleSchema = new mongoose.Schema({
  title: String,
  body: String,
  created_at: Date,
  updated_at: Date,
});

const Articles = connection.model('articles', articleSchema);

Articles.delete = (id) => {
	return Articles.deleteOne({_id : mongoose.Types.ObjectId(id)})
}

exports.Articles = Articles

exports.MockChange = () => {  
  const changeStream = Articles.watch()
  changeStream.on('change', data => {
    console.log(data)
  });
}

