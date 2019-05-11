const mongoose = require('mongoose');

const coordslSchema = new mongoose.Schema({

  _username: {
    type: String
  },
  userimage: {
    type: String
  },
  router_name: {
    type: String,
    default: this._username + Date().toString()
  },
  routes: [{
    coords: [{
      lng: {
        type: String
      },
      lat: {
        type: String
      }
    }],
  }
  ],

  timestamp: {
    type: Date,
    default: Date()
  }
});

const coords = mongoose.model('coords', coordslSchema);

module.exports = coords;

