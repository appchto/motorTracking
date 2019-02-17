const express = require('express');
const router = express.Router();
const Client = require('../models/clientmodel');
const { ensureAuthenticated } = require('../config/auth');
 
router.get('/ManageClients',  ensureAuthenticated, (req, res) => res.render('ManageClients', {
    user: req.user
})
);

router.get('/listAllClients',  ensureAuthenticated, (req, res) => {
  Client.find({}, (err, clients) => {
    if (err) {
      res.send(err);
    }

    res.json(clients);
  });

});

router.delete('/:id', ensureAuthenticated,  (req, res) => {
  Client.findByIdAndRemove(req.params.id, function (err, client) {
    if (err) res.send(err);
    req.flash('success_msg', 'Data Deleted!');
    res.json(client);
  });

});

router.put('/:id', ensureAuthenticated, (req, res) => {

  Client.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, client) {
    if (err) res.send(err);

    req.flash('success_msg', 'Data Updated!');
    res.json(client);
  });


});



module.exports = router;
