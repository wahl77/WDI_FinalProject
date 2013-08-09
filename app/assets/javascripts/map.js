$(document).ready(function() {
  var map = L.mapbox.map('map_container', 'examples.map-uci7ul8p', { zoomControl: false })
      .setView([37.7, -122.4183], 12);

  // moves the zoon controls the right side; defaults to 'topleft' if this line is left off.
  new L.Control.Zoom({ position: 'topright' }).addTo(map);

  // add filters div to the map
  map.legendControl.addLegend(document.getElementById('legend-content').innerHTML);

});


