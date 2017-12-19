const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({
  first_name:{
    type: String,
    required: true
  },
  last_name:{
    type: String,
    required: true
  },
  phone:{
    type: String,
    required: true
  }

});

const Client = module.exports = mongoose.model('Client', ClientSchema);
