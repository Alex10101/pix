const Joi = require('joi');

exports.getFew = Joi.object().keys({
  page: Joi.string().min(0).max(2),
  skip: Joi.string().min(0).max(2),
  limit: Joi.string().min(0).max(2),
});

exports.postOne = exports.putOne = Joi.object().keys({
  title: Joi.string().min(1).max(25).required().label("Title"),
  body: Joi.string().min(1).max(50).required().label("Body"),
});
