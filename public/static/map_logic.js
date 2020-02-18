try {

    var templist = [];

    var fillObjs = [];
    var requestDetails = {};
    var req_coordinates = "";
    var req_latitude = "";
    var req_longitude = "";
    var last_coords = "";
    var user = document.getElementById("user").textContent;
    var userimage = document.getElementById("userimage").textContent;
    var mapConfig = document.getElementById("mapConfig").textContent;
    var copDetails = {};
    var map, marker, map_first_location;
    var coordList = [];

    // Add geolocate control to the map.
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserLocation: true
    });

    var LatLng = {};
    // var LatLng = "";


    var localStorage_last_coords = localStorage.getItem("last_coords");
    if (localStorage_last_coords != null || localStorage_last_coords != undefined) {
      last_coords = JSON.parse(localStorage_last_coords);

      if (last_coords.coords != null) {
        map_first_location = [last_coords.coords.latitude, last_coords.coords.longitude];
      } else {
        map_first_location = [0, 0];
      }

    }

    mapboxgl.accessToken =
      "pk.eyJ1IjoiYXBwY2h0byIsImEiOiJjanM2eHppYTQwdjY5M3lvMXRzZXhoN2dxIn0.x08-MqHl0xfqHaWclzvuZw";
    map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: map_first_location, // starting position
      zoom: 18 // starting zoom
    });
    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.FullscreenControl());
    map.dragRotate.enable();
    map.touchZoomRotate.enable();
    map.touchZoomRotate.enableRotation();
    map.touchZoomRotate.enable({ around: 'center' });

    $(document).on('click', '.mapboxgl-ctrl-fullscreen', function (event) {
      
    });


    map.addControl(geolocate);

    map.on("load", async function (e) {
      //activate position on map
      geolocate.trigger();
      // await LoadCoordsFromDBuser();

    });

    geolocate.on("geolocate", async function (data) {

      var latLngObjs = {
        lng: "",
        lat: "",
        lastupdate: Date()
      };

      var lat = data.coords.latitude;
      var lng = data.coords.longitude;

      await SetMarkerToLocation(lng, lat);

      window.setInterval(function () {

        var userlocation = last_coords;
        var lastKnownLat, lastKnownLng;
        if (userlocation.coords != null) {
          lastKnownLat = userlocation.coords.latitude;
          lastKnownLng = userlocation.coords.longitude;
        } else {
          lastKnownLat = lat;
          lastKnownLng = lng;
        }


        var distancetomark = getDistanceFromLatLonInKm(
          lat,
          lng,
          lastKnownLat,
          lastKnownLng
        );

        var distanceInFeet = convertToFeet(distancetomark);
        let feetConfig = parseInt(mapConfig, 10);
        var checkdistance = distanceInFeet >= feetConfig;

        if (lat != lastKnownLat && lng != lastKnownLng && checkdistance) {
          console.log("Diferent position");

          lat = lastKnownLat;
          lng = lastKnownLng;

        }
      }, 10000);


    });

    map.on("click", async function (e) {
      coordinates = e.lngLat;

      await SetMarkerToLocation(coordinates.lng, coordinates.lat);

      last_coords = {
        coords:
        {
          longitude: coordinates.lng,
          latitude: coordinates.lat
        }
      };

      var savedbn = {
        username: user,
        userimage: userimage,
        coords: [
          {
            lng: coordinates.lng,
            lat: coordinates.lat
          }
        ]
      };
      // await saveToDb(savedbn);

      // await LoadCoordsFromDBuser();

    });

    // map.on("move", function(e) {
    //   LoadCoordsFromDBuser()
    // });

    async function SetMarkerToLocation(lng, lat) {

      var el = document.createElement("div");
      el.className = "marker";
      el.style.backgroundImage = 'url("images/MK4NUzI.png")'
      new mapboxgl.Marker(el).setLngLat([lng, lat]).addTo(map);

    }

    async function SetMarkerPopupToLocation(lng, lat) {
      var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      });
      map.getCanvas().style.cursor = "pointer";

      var el = document.createElement("div");
      el.className = "marker";
      el.style.backgroundImage = userimage;

      el.addEventListener("mouseover", function () {
        popup
          .setLngLat([lng, lat])
          .setHTML(
            "<h3>" +
            user +
            "</h3>" +
            "<img src='" +
            userimage +
            "' />" +
            "<p> Here is you position: lng and lat = " +
            [lng, lat] +
            "</p>"
          )
          .addTo(map);
      });
      el.addEventListener("mouseleave", function () {
        map.getCanvas().style.cursor = "";
        popup.remove();
      });

      new mapboxgl.Marker(el).setLngLat([lng, lat]).addTo(map);
    }

    function convertToFeet(value) {
      var Feet = value * 3280.8;
      Feet = Feet.toFixed(1);
      return Feet;
    }

    async function LoadCoordsFromDB() {
      $.ajax({
        type: "GET", // define the type of HTTP verb we want to use (POST for our form)
        url: "coords/listcords", // the url where we want to POST
        dataType: "json" // what type of data do we expect back from the server
      })
        .done(function (data) {
          data.forEach(function (marker) {
            SetMarkerToLocation(marker.coords[0].lng, marker.coords[0].lat);
          });
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
          console.log(jqXHR.responseText);
        });
    }

    async function LoadCoordsFromDBuser() {
      $.ajax({
        type: "GET", // define the type of HTTP verb we want to use (POST for our form)
        url: "coords/listcordsUser", // the url where we want to POST
        dataType: "json",
        async: true
      })
        .done(function (data) {
          data.forEach(async function (marker) {

            await SetMarkerToLocation(marker.coords[0].lng, marker.coords[0].lat);
          });
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
          console.log(jqXHR.responseText);
        });
    }

    async function saveToDb(dataToSave) {
      $.ajax({
        type: "POST", // define the type of HTTP verb we want to use (POST for our form)
        url: "coords/postcoords", // the url where we want to POST
        data: dataToSave, // our data object
        dataType: "json", // what type of data do we expect back from the server ,async: true
        encode: true,
        async: true

      })
        // using the done promise callback
        .done(function (data) {
          console.log("saveToDb");
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
          console.log(jqXHR.responseText);
        });
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


  } catch (error) {
    console.log(error);
  }
