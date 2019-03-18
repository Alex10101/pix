const Joi = require('joi');
const schemas = require('./articleSchemas');
const mongoose = require('mongoose');

checkId = (id, res) => {
  if(!id) {
    res.status(404).send({
      err: 'id is null'
    })
    return false;
  }
  if(!mongoose.Types.ObjectId.isValid(id)) {
    res.status(422).send({
      err: 'id is not valid',
    }) 
    return false;
  }
  return true;
}

exports.getFew = (req, res, next) => {
  const data = {
    page: req.query.page,
    limit: req.query.limit,
  };

  if(!data.page && !data.limit) {
    res.locals.data = {
      page: 1,
      skip: 0,
      limit: 10,
    }
    next();
    return;
  }

  Joi.validate(data, schemas.getFew)
      .catch((err) => {
        res.status(422).send({ 
          data: data,  
          err : err.details[0].message.replace(/["]/ig, '')
        });
        return;
      })
      .then((pass) => {
        if(pass) {
          res.locals.data = {
            page: data.page ? Number(data.page) : 1,
            skip: 0,
            limit: data.limit ? Number(data.limit) : 10
          };
          next();
        }
      });
};

exports.getOne = (req, res, next) => {
  console.log('getOne')
  if(!checkId(req.params.id, res)) {
    return;
  }
  next();
};

exports.putOne = (req, res, next) => {
  if(!checkId(req.params.id, res)) {
    return;
  }

  const data = {
    title: req.body.title,
    body: req.body.body,
  };

  Joi.validate(data, schemas.putOne)
      .catch((err) => {
        res.status(422).send({ 
          data: data,  
          err: err.details[0].message.replace(/["]/ig, '')
        });
        return;
      })
      .then((data) => {
        if(data) {
          next();
        }
      });
}

exports.postOne = (req, res, next) => {
  console.log('postOne')
  const data = {
    title: req.body.title,
    body: req.body.body,
  };

  Joi.validate(data, schemas.postOne)
      .catch((err) => {
        res.status(422).send({ 
          data: data,  
          err: err.details[0].message.replace(/["]/ig, '')
        });
        return;
      })
      .then((data) => {
        if(data) {
          next();
        }
      });
};
