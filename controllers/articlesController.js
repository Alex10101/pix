const Article = require('../models/articleSchema');

get = (req, name, Null) => {
  return req.body[name] || req.query[name] || Null;
};

exports.getFew = (req, res) => {
  const data = {
    skip: get(req, 'skip', '0'),
    limit: get(req, 'limit', '10'),
    searchBy: get(req, 'search_by', {}),
  };

  Article.find(data.searchBy)
      .skip(data.skip)
      .limit(data.limit)
      .exec((err, data) => {
        if (err) throw err;
        res.send(data);
      });
};


exports.getOne = (req, res) => {
  res.send(req.query);
};

exports.putOne = (req, res) => {
  res.send(req.query);
};

exports.postOne = (req, res) => {
  res.send(req.query);
};

