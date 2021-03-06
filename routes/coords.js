const express = require("express");
const router = express.Router();
const Coords = require("../models/coords");

router.get("/listcords", (req, res) => {
  Coords.find({}, (err, coords) => {
    if (err) {
      res.send(err);
    }

    res.json(coords);
  });
});


router.get("/listcordsUser", (req, res) => {

  var myfind = "";
  if (req.user == undefined || req.user == null) {
    myfind = { username: "no Name" };
  } else if (req.user != undefined || req.user != null) {
    // { username : " chto@outlook" }
      myfind = { username : req.user.name.trim() };
  }
  Coords.find(myfind, (err, coords) => {
    if (err) {
      res.send(err);
    }
    res.json(coords);
  });
});

router.post("/postcoords", (req, res) => {
  try {
    let newcoords = new Coords(req.body);
    newcoords.save((error, coords) => {
      if (error) {
        return error;
      }
        res.json(coords);
    });
  } catch (error) {
    res.json(error);
  }
});

router.delete("/:id", (req, res) => {
  Coords.findByIdAndRemove(req.params.id, function(err, coords) {
    if (err) res.send(err);
    req.flash("success_msg", "Data Deleted!");
    res.json(coords);
  });
});

router.put("/:id", (req, res) => {
  Coords.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(
    err,
    coords
  ) {
    if (err) res.send(err);

    req.flash("success_msg", "Data Updated!");
    res.json(coords);
  });
});

module.exports = router;
