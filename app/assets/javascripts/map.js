$(document).ready(function() {


  // defines the map and the 'type' of map.  Here is where we can change the look of the map
  var map = L.mapbox.map('map_container', 'examples.map-uci7ul8p', { zoomControl: false });

  // sets the map to this lat/long, with a zoom as the third argument
  map.setView([37.7572, -122.3999], 13);

  // moves the zoom controls the right side; defaults to 'topleft' if this line is left off.
  new L.Control.Zoom({ position: 'topright' }).addTo(map);

  // geolocate();

  // function geolocate() {
  //   if (navigator.geolocation) {
  //     console.log(navigator.geolocation);
  //     map.locate();
  //   };
  // };

  // map.on('locationfound', function(e) {
  //     map.fitBounds(e.bounds);

  //     // var map = L.mapbox.map('map_container', 'examples.map-uci7ul8p', { zoomControl: false })
  //     //     .setView([37.7, -122.4183], 12);

  //     map.setView([e.latlng.lat, e.latlng.lng], 12);

  //     map.markerLayer.setGeoJSON({
  //         type: "Feature",
  //         geometry: {
  //             type: "Point",
  //             coordinates: [e.latlng.lng, e.latlng.lat]
  //         }
  //         // properties: {
  //         //     'marker-color': '#000',
  //         //     'marker-symbol': 'star-stroked'
  //         // }
  //     });
  // });

  var moveSlide;

  // This example uses jQuery to make selecting items in the slideshow easier.
  // Download it from http://jquery.com
  var moveSlide = function(direction) {
    var $slideshow = $('.slideshow'),
      totalSlides = $slideshow.children().length;

    if (direction === 'prev') {
      var $newSlide = $slideshow.find('.active').prev();
      if ($newSlide.index() < 0) {
          $newSlide = $('.image').last();
      }
    } else {
      var $newSlide = $slideshow.find('.active').next();
      if ($newSlide.index() < 0) {
          $newSlide = $('.image').first();
      }
    }

    $slideshow.find('.active').removeClass('active').hide();
    $newSlide.addClass('active').show();
    return false;
  }; // close moveSlide


  // geoJson is the content of the marker icon and the images inside.  This is where we'll dynamically interact with them.
  var geoJson = [{
      type: 'Feature',
      "geometry": {
        "type": "Point",
        // of note:  for some reason that lat/long need to be reversed here such that it is long/lat
        "coordinates": [-122.3999, 37.7572]
      },
      // This is for a custom marker on the map
      "properties": {
        'title': 'little kitten',
        'icon': {
          "iconUrl": "http://placekitten.com/50/50",
          "iconSize": [50, 50], // size of the icon
          "iconAnchor": [25, 25], // point of the icon which will correspond to marker's location
          "popupAnchor": [0, -25]  // point from which the popup should open relative to the iconAnchor
        },
        // These are the images for the photo display
        // Store the image url and caption in an array
        'images': [
          ['http://i.imgur.com/O6QEpBs.jpg','The U.S. Capitol after the burning of Washington during the War of 1812'],
          ['http://i.imgur.com/xND1MND.jpg','Ford\'s Theatre in the 19th century, site of the 1865 assassination of President Lincoln'],
          ['http://i.imgur.com/EKJmqui.jpg','The National Cherry Blossom Festival is celebrated around the city each spring.']
        ]
      }
  }]; // close geoJson

  // Add custom popup html to each marker
  // And sets the custom marker for each marker based on the feature properties
  map.markerLayer.on('layeradd', function(e) {
    var marker = e.layer;
      feature = marker.feature;

    marker.setIcon(L.icon(feature.properties.icon));

    var images = feature.properties.images;
    var slideshowContent = '';


    for(var i = 0; i < images.length; i++) {
      var img = images[i];

      slideshowContent +=
        '<div class="image' + (i === 0 ? ' active' : '') + '">' +
          '<img src="' + img[0] + '" />' +
          '<div class="caption">' + img[1] + '</div>' +
        '</div>';
    }

    // Create custom popup content
    var popupContent =
      '<div id="' + feature.properties.id + '" class="popup">' +
        '<h2>' + feature.properties.title + '</h2>' +
        '<div class="slideshow">' + slideshowContent + '</div>' +
        '<div class="cycle">' +
          '<a href="#" class="prev" >&laquo; Previous</a>' +
          '<a href="#" class="next" >Next &raquo;</a>' +
        '</div>' +
      '</div>';

    // http://leafletjs.com/reference.html#popup
    marker.bindPopup(popupContent,{
      closeButton: false,
      minWidth: 320
    });
  });

  // Add features to the map
  map.markerLayer.setGeoJSON(geoJson);

  // because 'prev' & 'next'/popup do not exist in the DOM yet, moveSlide doesn't work without a call on the body afterward.
  $('body').on('click', '.prev', moveSlide);
  $('body').on('click', '.next', moveSlide);


});


