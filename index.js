const app = require('express')();
const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
// .env module for WebStorm didn't work. resolve this later.
mongoose.connect(process.env.DB_URI || 'mongodb://dan:dan123@ds247347.mlab.com:47347/node');
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log(
      '%s MongoDB connection error. Please make sure you have internet connection.'
  );
  process.exit();
});

const articlesController = require('./controllers/articlesController');

app.use(express.urlencoded({limit: '1kb', extended: true}));
app.use(express.json({limit: '1kb'}));


app.get('/articles?page=:pageNumber&limit=:limit', articlesController.getFew);
app.get('/articles/:id', articlesController.getOne);
app.put('/articles/:id', articlesController.putOne);
app.post('/articles', articlesController.postOne);

app.use(function set404(req, res) {
  res.redirect('/');
});

app.use(function globErrorHandler(err, req, res) {
  res.status(500).send(err);
});

app.listen(8080);

process.on('unhandledRejection', unhandledRejection = (reason, p) => {
  throw reason;
});
process.on('uncaughtException', uncaughtException = (error) => {
  console.log(error);
});
