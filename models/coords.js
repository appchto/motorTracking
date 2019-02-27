const mongoose = require('mongoose');

const coordslSchema = new mongoose.Schema({
  // location: { 
  //   coords: [ 
  //     {
  //            lng : {
  //               type: String
  //             },
  //             lat: {
  //               type: String
  //             }
  //           }
  //   ] 
  // }

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

