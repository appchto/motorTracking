const mongoose = require('mongoose');

const DrivermodelSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  earnedRatings: {
    type: Number
  },
  totalRatings: {
    type: Number
  },
  location: [
    {
      type: {
        type: String
      },
      address: {
        type: String
      },
      coordinates: [{
        lat: {
          type: String
        },
        lon: {
          type: String
        }
      }
      ]
    }

  ],
  date_created: {
    type: Date,
    default: Date.now
  },
  last_access: {
    type: Date
  }

});

const Drivermodel = mongoose.model('drivermodel', DrivermodelSchema);

module.exports = Drivermodel;

