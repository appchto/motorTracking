const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', (req, res) => res.render('welcome', {
  user: req.user
}));

router.get('/map', ensureAuthenticated, (req, res) => res.render('map', {
  user: req.user,
})
);
router.get('/maptracker', ensureAuthenticated, (req, res) => res.render('maptracker', {
  user: req.user,
})
);

router.get('/about', (req, res) => res.render('about', {
  user: req.user
}));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

module.exports = router;
