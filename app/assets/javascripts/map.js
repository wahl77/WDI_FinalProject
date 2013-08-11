$(document).ready(function() {
  var map = L.mapbox.map('map_container', 'examples.map-uci7ul8p', { zoomControl: false })
      .setView([37.7, -122.4183], 12);

  var moveSlide;

  // defines the map and the 'type' of map.  Here is where we can change the look of the map
  var map = L.mapbox.map('map_container', 'examples.map-uci7ul8p', { zoomControl: false });

  // sets the map to this lat/long, with a zoom as the third argument
  map.setView([37.7572, -122.3999], 13);

  // moves the zoom controls the right side; defaults to 'topleft' if this line is left off.
  new L.Control.Zoom({ position: 'topright' }).addTo(map);

});


