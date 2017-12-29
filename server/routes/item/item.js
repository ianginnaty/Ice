const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const database = require('../../database/config');
const Item = require('../../models/item/item');

//Retrieve data
router.get('/item/all', (request, result, next)=>{
  Item.find(function(error, item){
    result.json(item);
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
      output.reasons = [ "Data base error", error ];
      result.json(output);
    }
    else{
      output.success = true;
      output.msg = "Item saved";
      result.json(output);
    }
  });
});

module.exports = router;
