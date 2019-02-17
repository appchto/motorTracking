const mongoose = require('mongoose');

const clientmodelSchema = new mongoose.Schema({
  requestTime: {
    type: Date,
    default: Date.now
  },
  location: [
    {
      coordinates: [{
        lat: {
          type: String
        },
        lon: {
          type: String
        }
      }
      ],
      address: {
        type: String
      }
    }

  ],
  clientid: {
    type: String
  },
  status: {
    type: String
  },
  driverid: {
    type: Number
  },
  date_created: {
    type: Date,
    default: Date.now
  },
  last_access: {
    type: Date
  }

});

const clientmodel = mongoose.model('clientmodel', clientmodelSchema);

module.exports = clientmodel;

