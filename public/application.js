var map;
var job = "811 E 11th St Austin TX";
var overlayDrawer = document.getElementsByClassName('overlay-drawer')[0];

function renderSearchBar() {
  overlayDrawer.innerHTML = [
    "<p>Enter your work address.</p>",
    "<form action='/' method='get'>",
      "<input type='text' name='work_addr' id='work_addr'>",
      "<button>Search</button>",
    "</form>",
  ].join("");
}

// Renders 25 apartment listings starting from "start" param
function renderApartmentListings(apartments, start) {
  apartments = apartments || [];
  start = start || 0;
  if (start < 0) start = 0

  aptListings = [];
  for (var apt in apartments) {
    aptListings.push([
      "<div class='apartment-listing'>",

      "</div>",
    ].join(""));
  }

  overlayDrawer.innerHTML = aptListings.join("");
}

var url = new Url();

if (!url.query["work_loc"]) {
  renderSearchBar();
  console.log("No work_loc");
} else {
  console.log("Has work_loc");
}

function distanceMatrixCallback(response, status) {
  if (status == 'OK') {
    var destinationAddresses = response["destinationAddresses"];
    var rows = response["rows"];
    if (!rows.length) return console.log("No rows.");

    var destinationTimes = rows[0]["elements"];
    if (!destinationTimes.length) return console.log("No dest times.");

    for (var i = 0; i < destinationTimes.length; i++) {
      var destTime = destinationTimes[i];
      var destAddress = destinationAddresses[i];
      var model = APARTMENT_DATA[i];
      var durationInTraffic = destTime["duration_in_traffic"]["text"];

      var marker = new google.maps.Marker({ map: map, position: { lat: parseFloat(model["Lat"]), lng: parseFloat(model["Lng"]) } });
    }
  } else {
    alert('Distance matrix was not successful for the following reason: ' + status);
  }
}

function initMap() {
  var geocoder = new google.maps.Geocoder();
  var distanceMatrix = new google.maps.DistanceMatrixService();

  var nextMonday = new Date();
  nextMonday.setDate(nextMonday.getDate() + (7-nextMonday.getDay())%7+1);
  // 8 AM
  nextMonday.setHours(18,0,0);

  var destinations = [];
  for (var i = 0; i < APARTMENT_DATA.length; i++) {
    var apt = APARTMENT_DATA[i];
    destinations.push({ lat: parseFloat(apt["Lat"]), lng: parseFloat(apt["Lng"]) });
  }

  distanceMatrix.getDistanceMatrix({
    origins: [job],
    destinations: destinations,
    travelMode: 'DRIVING',
    drivingOptions: { departureTime: nextMonday },
    avoidTolls: true,
  }, distanceMatrixCallback);

  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 30.248685, lng: -97.7431115 },
    zoom: 13
  });

  geocoder.geocode( { 'address': job }, function(results, status) {
    if (status == 'OK') {
      addr_location = results[0].geometry.location;
      var marker = new google.maps.Marker({ map: map, position: addr_location });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
