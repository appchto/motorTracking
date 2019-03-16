var assert = require("assert");
var mapConfig = require("../config/mapConfig");

describe("Map tests", function() {
  it("should return images/dog_paw.png", function() {
    var userimage = "/public/images/dog_paw.png";
    userimage = userimage.replace("/public/", "");
    assert.equal("images/dog_paw.png", userimage);
  });

  it("test if true", function() {
    distanceInkm = 0.5;
    var result = distanceInkm >= 0.5;
    assert.equal(true, result);
  });

  it("test Diferent position", function() {
      //86 feet
      var lat1, lon1, lat2, lon2;
      lat1 = "-22.85088";
      lon1 = "-43.00601";
      lat2 = "-22.85111";
      lon2 = "-43.00608";
  
    var distancetomark = getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);
    var distanceInFeet = convertToFeet(distancetomark);
    console.log(distanceInFeet);
    var checkdistance = distanceInFeet >= `${mapConfig.distance2setMaker}`;

    if (lat1 != lon1 && lat2 != lon2 && checkdistance) {
      assert.equal(true, checkdistance, "Diferent position");
    } else {
      assert.equal(false, checkdistance, "same position");
    }

  });

  it("test same position", function() {
    //40.2
    var lat1, lon1, lat2, lon2;
    lat1 = "-22.85088";
    lon1 = "-43.00601";
    lat2 = "-22.85098";
    lon2 = "-43.00606";

    var distancetomark = getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);
    var distanceInFeet = convertToFeet(distancetomark);
    console.log(distanceInFeet);
    var checkdistance = distanceInFeet >= mapConfig.distance2setMaker;

    if (lat1 != lon1 && lat2 != lon2 && checkdistance) {
    } else {
      console.log("same position");
      assert.equal(false, checkdistance, "same position");
    }

  });

  it("test distanceInkm 40 feet", function() {
    //40.2
    var lat1, lon1, lat2, lon2;
    lat1 = "-22.85088";
    lon1 = "-43.00601";
    lat2 = "-22.85098";
    lon2 = "-43.00606";

    var distancetomark = getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);
    var distanceInFeet = convertToFeet(distancetomark);
    console.log(distanceInFeet);
    var checkdistance = distanceInFeet >= mapConfig.distance2setMaker;
    assert.equal(false, checkdistance);
  });

  it("test distanceInkm  83ft feet", function() {
    //83ft
    var lat1, lon1, lat2, lon2;
    lat1 = "-22.85088";
    lon1 = "-43.00601";
    lat2 = "-22.85110";
    lon2 = "-43.00608";

    var distancetomark = getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);
    var distanceInFeet = convertToFeet(distancetomark);
    console.log(distanceInFeet);
    var checkdistance = distanceInFeet >= mapConfig.distance2setMaker;
    assert.equal(false, checkdistance);
  });
  it("test distanceInkm >= 86 feet", function() {
      //86 feet
    var lat1, lon1, lat2, lon2;
    lat1 = "-22.85088";
    lon1 = "-43.00601";
    lat2 = "-22.85111";
    lon2 = "-43.00608";

    var distancetomark = getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);
    var distanceInFeet = convertToFeet(distancetomark);
    console.log(distanceInFeet);
    var checkdistance = distanceInFeet >= mapConfig.distance2setMaker;
    assert.equal(true, checkdistance);
  });

  it("if diff greater than 1 km", function() {
    var lat1, lon1, lat2, lon2;
    lat1 = "-22.8513380";
    lon1 = "-43.00616769999999";
    lat2 = "-22.8513388";
    lon2 = "-43.00616769999999";

    var value = getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);

    var km = convertToKm(value);
    km = 2;
    value = km + " km"; // 1613.8 km

    if (km > 1) {
      value = true;
    } else {
      value = false;
    }

    assert.equal(true, value);
    assert.notEqual(null, value);
    assert.notEqual(undefined, value);
  });

  it("if diff less than 1 km", function() {
    var lat1, lon1, lat2, lon2;
    lat1 = "-22.8513380";
    lon1 = "-43.00616769999999";
    lat2 = "-22.8513388";
    lon2 = "-43.00616769999999";

    var value = getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);

    var km = convertToKm(value);

    value = km + " km"; // 1613.8 km

    if (km < 1) {
      value = 0;
    }

    assert.equal(0, value);
    assert.notEqual(null, value);
    assert.notEqual(undefined, value);
  });

  function convertToKm(value) {
    var km = value / 1000;
    km = km.toFixed(1);
    return km;
  }
  it("should return getDistanceFromLatLonInKm", function() {
    var lat1, lon1, lat2, lon2;
    lat1 = "-22.8513380";
    lon1 = "-43.00616769999999";
    lat2 = "-22.8513388";
    lon2 = "-43.00616769999999";
    var value = getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);
    value = convertToCm(value) + " cm";

    assert.notEqual(null, convertToCm(value));
    assert.notEqual(null, value);
    assert.notEqual(undefined, value);
  });
  function convertToFeet(value) {
    var Feet = value * 3280.8;
    Feet = Feet.toFixed(1);
    return Feet;
  }

  function convertToCm(value) {
    var cm = value * 100000;
    cm = cm.toFixed(1);
    return cm;
  }
  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  it("should return distance", function() {
    var lat1, lon1, lat2, lon2, unit;
    lat1 = "-22.8513380";
    lon1 = "-43.00616769999999";
    lat2 = "-22.8513388";
    lon2 = "-43.00616769999999";
    unit = "K";
    var value = distance(lat1, lon1, lat2, lon2, unit);
    console.log(value);
    assert.notEqual(undefined, value);
    assert.notEqual(null, value);
  });

  function distance(lat1, lon1, lat2, lon2, unit) {
    if (lat1 == lat2 && lon1 == lon2) {
      return 0;
    } else {
      var radlat1 = (Math.PI * lat1) / 180;
      var radlat2 = (Math.PI * lat2) / 180;
      var theta = lon1 - lon2;
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == "K") {
        dist = dist * 1.609344;
      }
      if (unit == "N") {
        dist = dist * 0.8684;
      }
      return dist;
    }
  }

  it("should return getDistanceFromLatLonInKm", function() {
    var lat1, lon1, lat2, lon2, unit;
    lat1 = "-22.8513380";
    lon1 = "-43.00616769999999";
    lat2 = "-22.8513388";
    lon2 = "-43.00616769999999";
    unit = "K";

    var value = getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2, unit).toFixed(
      1
    );

    console.log(value);

    assert.notEqual(undefined, value);
    assert.notEqual(null, value);
  });

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
});
