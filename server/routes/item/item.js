const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const database = require('../../database/config');
const Item = require('../../models/item/item');

//Retrieve data
router.get('/item/all', (request, result, next)=>{
  Item.find(function(error, items){
    if (error) {
      result.json({
        success: false,
        msg: "Failed to load",
        reasons: [ error ]
      });
    }
    else {
      result.json({
        success: true,
        items: items
      });
    }
  });
});

//Add data
router.post('/item/add', (request, result, next)=>{

  let newItem = Item.create(request.body);

  let validation = Item.c_validate(newItem);

  let output = {
    success: false,
    msg: "Failed to save",
    reasons: []
  }

  if (!validation.valid) {
    output.reasons = validation.reasons;
    result.json(output);

    return;
  }

  Item.addItem(newItem, (error, item) => {
    if (error) {
      output.reasons = [ "Database error", error ];
    }
    else {
      output.success = true;
      output.msg = "Item saved";
    }

    result.json(output);
  });
});

//Udpate data
router.post('/item/update', function (request, result, next) {
  let item = Item.create(request.body);
  let validation = Item.c_validate(item);

  let output = {
    success: false,
    msg: "Failed to update",
    reasons: []
  };

  if (!validation.valid) {
    output.reasons = validations.reasons;
    result.json(output);

    return;
  }

  Item.findOneAndUpdate({ _id: item._id }, { $set: item }, { 'new': true },
    function(error, document) {
      if (error) {
        output.reaons = [ "Database error", error ];
      }
      else {
        output.success = true;
        output.msg = "Item updated";
      }

      result.json(output);
  });

});

//Delete data
router.post('/item/delete', function (request, result, next) {
  let output = {
    success: false,
    msg: "Failed to delete",
    reasons: []
  };

  Item.findOneAndRemove({ _id: request.body._id },
    function (error, document) {
      if (error) {
        output.reasons = [ "Database error", error ];
      }
      else {
        output.success = true;
        output.msg = "Item deleted";
      }

      result.json(output);
    }
  );
});

module.exports = router;