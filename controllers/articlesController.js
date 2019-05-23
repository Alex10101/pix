const { Readable, Writable, Get } = require('../models/articleSchema');
const mongoose = require('mongoose');

exports.getFew = async (req, res) => {
  const data = res.locals.data;

  if(data.page > 0) {
    data['skip'] = (data.page * data.limit)
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

  let obj = {
    count: rcount + wcount - 3,
    rcount,
    page: data.page,
    limit: data.limit,
    articles: readable.length ? 
      [...readable, ...writable] 
    : [...writable]
  }

  res.send(obj)
};

exports.getOne = async(req, res) => {
  let data = res.locals.data

  console.log(data)

  let writable = await Writable.find().skip(data.page * data.limit).limit(1).exec()

  res.send(writable)
}

exports.getById = async(req, res) => {
  let data = await Get(req.params.id)
  res.send(data)
};

exports.putOne = (req, res) => {
  console.log('putOne')
  // Non-direct queries for using mongoose middlewares which not implemented here
  Writable.get(req.params.id) 
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
  article = new Writable({
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

exports.deleteOne = async (req, res) => {
  let resp = await Writable.delete(req.body.id)
  res.send(resp)
}