const { Readable, Writable } = require('../models/articleSchema');
const mongoose = require('mongoose');

exports.getFew = async (req, res) => {
  const data = res.locals.data;

  if(data.page > 0) {
    data['skip'] = data.page * data.limit
  }

  console.log('getFew', data)

  let rcount  = await Readable.countDocuments()
  let wcount = await Writable.countDocuments()

  let readable = await Readable.find()
      .skip(data.skip)
      .limit(data.limit)
      .exec()

  let writable = await Writable.find()
    .skip(data.skip)
    .limit(data.limit - readable.length)
    .exec()

  let rWarn = {
    _id: "Read-only data"
  }

  let wWarn = {
    _id: "Writable data"
  }

  let obj = {
    count: rcount + wcount - 1,
    rcount: readable.length,
    rcount,
    page: data.page,
    limit: data.limit,
    articles: readable.length ? 
      [...readable, ...writable] 
    : [...writable]
  }

  res.send(obj)
};

exports.getOne = (req, res) => {
  Article.find(mongoose.Types.ObjectId(req.params.id))
  .exec((err, data) => {
      if (err) throw err;
      res.send(data);
  })
};

exports.putOne = (req, res) => {
  console.log('putOne')
  // Non-direct queries for using mongoose middlewares which not implemented here
  Article.findById(mongoose.Types.ObjectId(req.params.id)) 
    .exec((err, article) => {
      if(err) {
        res.status(500).end();
        console.log("err", err);
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

