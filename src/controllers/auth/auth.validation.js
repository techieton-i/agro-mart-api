const Joi = require('joi');

exports.validateRegisterBody = (payload) => {
    const schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      role: Joi.string()
    });
  
    return schema.validate(payload);
  };

  exports.validateLoginBody = (payload) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    });
  
    return schema.validate(payload);
  };