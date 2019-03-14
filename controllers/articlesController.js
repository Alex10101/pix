const Article = require('../models/articleSchema');
const mongoose = require('mongoose');

exports.getFew = (req, res) => {
  console.log('getFew')
  const data = res.locals.data;

  if(data.page > 1) {
    data['skip'] = data.page * data.limit
  }

  Article.find()
      .skip(data.skip)
      .limit(data.limit)
      .exec((err, articles) => {
        if (err) throw err;
        Article.countDocuments((err, count) => {
          res.send({
            count, 
            page: data.page,
            limit: data.limit,
            articles
          });
        })
      });
};

exports.getOne = (req, res) => {
  Article.find(mongoose.Types.ObjectId(req.params.id))
  .exec((err, data) => {
      if (err) throw err;
      res.send(data);
  })
};

exports.putOne = (req, res) => {
  // Non-direct queries for using mongoose middlewares which not implemented here
  Article.findById(mongoose.Types.ObjectId(req.params.id)) 
    .exec((err, article) => {
      if(err) {
        res.status(500).end();
        console.log(err);
        return;
      }
      article['title'] = req.body.title;
      article['body'] = req.body.body;
      article['updated_at'] = new Date();
      
      article.save((saveErr, updatedFile) => {
          res.send({ updated_to: updatedFile });
      });
  });
};

exports.postOne = (req, res) => {
  article = new Article({
    title: req.body.title,
    body: req.body.body,
    created_at: new Date()
  });
  article.save((err, data) => {
    if(err) {
      res.status(500).end();
      return
    }

    res.send({
      created: data
    })
  });
};

