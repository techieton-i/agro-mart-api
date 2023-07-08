const Joi = require('joi');


exports.validateProductBody = (payload) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      desc: Joi.string().required(),
      size: Joi.string().required(),
      amount: Joi.number(),
      category: Joi.string(),
      price: Joi.number().required()
    });
  
    return schema.validate(payload);
  };