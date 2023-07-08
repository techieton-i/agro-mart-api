const _= require('lodash');

const Order = require('../models/Order')

const letters = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];

exports.filterJwtPayload = (payload)=>{
    return _.pick(payload, ['_id', 'email', 'role'])
}

exports.generateRandom = (limit) => Math.floor(Math.random() * limit);

exports.getUniqueId = async () => {
    let word;
    let number;
    let orderId;
    let order;
    let isUnique = false;
  
    do {
      word =
        letters[this.generateRandom(letters.length)] + letters[this.generateRandom(letters.length)];
      number = this.generateRandom(99999);
      orderId = number + word;
      order = await Order.findOne({orderId});
  
      if (!order) isUnique = true;
    } while (!isUnique);
  
    return orderId;
  };