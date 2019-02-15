const mongoose = require('mongoose');
var passportlocalmongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String, 
    required: true, 
    unique: true, 
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
},
  password: {
    type: String,
    required: true
  },
  date_created: {
    type: Date,
    default: Date.now
  }

});
UserSchema.plugin(passportlocalmongoose);

const User = mongoose.model('User', UserSchema);

module.exports = User;
