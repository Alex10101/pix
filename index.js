const express = require('express')
const app = express();
const http = require('http');
const pt = require('path')

const articlesController = require('./controllers/articlesController');
const articleAsserts = require('./services/articleAsserts');

process.env.NODE_ENV !== "development" && 
app.all('*', (req,res,next) => {
  if (!req.get('Origin')) return next();

  res.set('Access-Control-Allow-Origin','*');
  res.set('Access-Control-Allow-Methods','GET,POST,PUT,DELETE');
  res.set('Access-Control-Allow-Headers','X-Requested-With,Content-Type');

  if ('OPTIONS' == req.method) return res.sendStatus(200);

  next();
});

app.get('/favicon.ico', (req, res) => res.status(204));
app.use(express.static(pt.join(__dirname, 'views/build')))
app.use(express.static(pt.join(__dirname, 'views')))
app.get('/', (req, res) => {
  res.sendFile('iframe.html')
})

app.use(express.urlencoded({limit: '5kb', extended: true}));
app.use(express.json({limit: '5kb'}));

app.get('/articles', articleAsserts.getFew, articlesController.getFew);
app.get('/article', articleAsserts.getFew, articlesController.getOne);
app.get('/articles/:id', articleAsserts.getOne, articlesController.getById);
app.put('/articles/:id', articleAsserts.putOne, articlesController.putOne);
app.post('/articles', articleAsserts.postOne, articlesController.postOne);
app.put('/articles', articlesController.deleteOne);

app.get('/subscribe', articlesController.subscribe)


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

process.on('unhandledRejection', unhandledRejection = (reason, p) => {
  throw reason;
});
process.on('uncaughtException', uncaughtException = (error) => {
  console.log("uncaughtException", error);
});

app.listen(process.env.PORT || 8080);