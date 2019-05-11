const mongoose = require('mongoose');

const coordslSchema = new mongoose.Schema({
 
  username : {
    type: String
  },
  userimage : {
    type: String
  },
  coords:[{
       lng : {
          type: String
        },
        lat: {
          type: String
        }
      }],
      timestamp : {
        type: Date,
        default : Date()
      }
});

const coords = mongoose.model('coords', coordslSchema);

module.exports = coords;

