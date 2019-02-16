const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const mongoose = require("mongoose");


// Dashboard
router.get('/Managerdashboard', ensureAuthenticated, (req, res) =>
  res.render('Manager_dashboard', {
    user: req.user
  })
);


router.get('/deletedb', ensureAuthenticated, (req, res) => {
  
var delDb = 'users'
  mongoose.connection.db.dropCollection(delDb, function(err, result) {
    Console.log(delDb + 'Deleted')
  })
}

);







module.exports = router;
