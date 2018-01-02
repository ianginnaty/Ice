const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const database = require('../../database/config');

const ItemSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    default: 0
  },
  details: {
    type: String,
    default: ""
  }
});

const Item = module.exports = mongoose.model('Item', ItemSchema);

/*
  Essentially a custom constructor since a null value in one of the fields will overwrite the default value of the item
  Seems like an oversight in mongoose
*/
module.exports.create = function(json) {
  var newItem = new Item({
    title:       json.title,
    description: json.description,
  });

  if (json._id) {
    newItem._id = json._id;
  }

  Item.addPrice(newItem, json.price);
  
  if (null != json.quantity) {
    newItem.quantity = json.quantity;
  }

  if (null != json.details) {
    newItem.details = json.details;
  }

  return newItem;
}

module.exports.addItem = function(newItem, callback){
  newItem.save(callback);
}

module.exports.addPrice = function (item, price) {
  let newPrice = price;
  if ('$' == newPrice[0]) {
    newPrice = newPrice.substring(1, newPrice.length);
  }
  newPrice = parseFloat(newPrice);

  if (NaN != newPrice) {
    item.price = newPrice;
  }
}

// TODO: find a simpler way of doing the serve-side validation
module.exports.c_validate = function(newItem) {
  let valid = true;
  let reasons = [];

  if (
    null == newItem.title ||
    !/^[A-Z].*$/.test(newItem.title) ||
    4 > newItem.title.length ||
    40 < newItem.title.length
  ) {
    reasons.push("Title needs to be capitalized, at least 4 characters, and not more than 40");
    valid = false;
  }

  if (
    null == newItem.description ||
    80 < newItem.description.length
  ) {
    reasons.push("Description cannot be empty or more than 80 characters long");
    valid = false;
  }

  if (
    null == newItem.price ||
    NaN == newItem.price ||
    0 > newItem.price
  ) {
    reasons.push("Items must have a valid, non-negative price");
    valid = false;
  }

  if (
    null != newItem.details &&
    2400 < newItem.details.length
  ) {
    reasons.push("Item details length cannot exceed 2400 characters");
    valid = false;
  }

  return {
    valid: valid,
    reasons: reasons
  };
}