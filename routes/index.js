const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const mapConfig = require('../config/mapConfig');

// Welcome Page
router.get('/', (req, res) => res.render('welcome', {
  user: req.user
}));

router.get('/map', ensureAuthenticated, (req, res) => res.render('map', {
  user: req.user,
})
);
// 
router.get('/map2', ensureAuthenticated, (req, res) => res.render('map2', {
  user: req.user,
  mapConfig: mapConfig
})
);
router.get('/map3', ensureAuthenticated, (req, res) => res.render('map3', {
  user: req.user,
  mapConfig: mapConfig
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
