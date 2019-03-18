const express = require('express')
const app = express();
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
const articleAsserts = require('./services/articleAsserts');

app.all('*', (req,res,next) => {
    if (!req.get('Origin')) return next();

    res.set('Access-Control-Allow-Origin','*');
    res.set('Access-Control-Allow-Methods','GET,POST,PUT');
    res.set('Access-Control-Allow-Headers','X-Requested-With,Content-Type');

    if ('OPTIONS' == req.method) return res.sendStatus(200);

    next();
});

app.use(express.urlencoded({limit: '5kb', extended: true}));
app.use(express.json({limit: '5kb'}));

app.get('/articles', articleAsserts.getFew, articlesController.getFew);
app.get('/articles/:id', articleAsserts.getOne, articlesController.getOne);
app.put('/articles/:id', articleAsserts.putOne, articlesController.putOne);
app.post('/articles', articleAsserts.postOne, articlesController.postOne);

app.use(function set404(req, res) {
	res.status(404).end({
	    "errors": [{
	        "error": "Not Found"
	    }]
	})
});

app.use(function globErrorHandler(req, res, next) {
	console.log("globErrorHandler")
  res.send('err');
  return;
});

app.listen(8080);

process.on('unhandledRejection', unhandledRejection = (reason, p) => {
  throw reason;
});
process.on('uncaughtException', uncaughtException = (error) => {
  console.log("uncaughtException", error);
});
