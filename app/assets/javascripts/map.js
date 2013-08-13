$(document).ready(function() {

  function geolocate() {
    if (navigator.geolocation) {
      console.log(navigator.geolocation);
      map.locate();
    };
  };

  // defines the map and the 'type' of map.  Here is where we can change the look of the map
  var map = L.mapbox.map('map_container', 'examples.map-uci7ul8p', { zoomControl: false });

  // moves the zoom controls the right side; defaults to 'topleft' if this line is left off.
  new L.Control.Zoom({ position: 'topright' }).addTo(map);

  map.on('locationfound', function(e) {
      map.fitBounds(e.bounds);
      map.setView([e.latlng.lat, e.latlng.lng], 12);
  });

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
          ['http://i.imgur.com/O6QEpBs.jpg','Baby christina U.S. Capitol after the burning of Washington during the War of 1812'],
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
        '<div id="makeMeScrollable" class="slideshow">' + slideshowContent + '</div>' +
        '<div class="cycle">' +
          '<a href="#" class="prev" >&laquo; Previous</a>' +
          '<a href="#" class="next" >Next &raquo;</a>' +
        '</div>' +
        '<button id="search_insights"> Search Similar Insights </button>'
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

  geolocate();

  // toggles the class on the filter buttons so that when they are clicked they look 'depressed', similarly when they are unclicked
  var depress_button = function() {
    $('.filter_buttons').click(function() {
      $(this).toggleClass('clicked');
    });
  };
  depress_button();

  // christina's code:

  $('body').on('click', '#search_insights', function(){
     $.ajax({
       type: "POST",
       url: '/search',
       data: { search: $('.slideshow .image.active .caption').text() },
       dataType: "json"
     }).done(add_markers);
  });

  var add_markers = function(response) {
    markers = []

    for (var i = 0; i < response.length; ++i){
      var longitude = response[i].long;
      var lat = response[i].lat;
      markers.push(
      {
        type: 'Feature',
        "geometry": {
          "type": "Point",
          // of note:  for some reason that lat/long need to be reversed here such that it is long/lat
          "coordinates": [longitude, lat]
        },
        // This is for a custom marker on the map
        "properties": {
          'title': 'When I...',
          'icon': {
            "iconUrl": response[i].url.url,
            "iconSize": [50, 50], // size of the icon
            "iconAnchor": [25, 25], // point of the icon which will correspond to marker's location
            "popupAnchor": [0, -25]  // point from which the popup should open relative to the iconAnchor
          },
          // These are the images for the photo display
          // Store the image url and caption in an array
          'images': [
            [response[i].url.url, response[i].caption],
          ]
        }
      }) // End marker object
    }
    map.markerLayer.setGeoJSON(markers);

  };

  if(window.location.href.indexOf("location") > -1) {
    map.on('locationfound', function(e) {
        map.fitBounds(e.bounds);
        map.setView([e.latlng.lat, e.latlng.lng], 12);
        var marker = L.marker(new L.LatLng(e.latlng.lat, e.latlng.lng), {
          icon: L.mapbox.marker.icon({'marker-color': 'CC0033', }),
          draggable: true
        });
        marker.bindPopup('<button> Save Your Location </button>')
        marker.addTo(map);
        $('body').on('click', '.leaflet-popup-content-wrapper', function(){
          $.ajax({
            type: "POST",
            url: '/save_location',
            data: { lat: marker._latlng.lat, lng: marker._latlng.lng, url: window.location.href },
          }).done(notify_saved);
        });
        var notify_saved = function() {
          $('.leaflet-popup-content').text('Location Saved!')
        };
    });

  }

});

// 1) set location in routes
// 2) set controller action
// 3) splice by "/"
// 4) find image id and save lat and long
// 5) redirect to home

