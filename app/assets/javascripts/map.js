$(document).ready(function() {

  var moveSlide;

  // defines the map and the 'type' of map.  Here is where we can change the look of the map
  var map = L.mapbox.map('map_container', 'examples.map-uci7ul8p', { zoomControl: false });

  // sets the map to this lat/long, with a zoom as the third argument
  map.setView([53.000, 9.000], 5);

  // moves the zoom controls the right side; defaults to 'topleft' if this line is left off.
  new L.Control.Zoom({ position: 'topright' }).addTo(map);

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




  // map filter logic starts here

  // these are the map filter buttons
  var you_button = $('#you');
  var friends_button = $('#friends');
  var everyone_button = $('#everyone');
  var filter_buttons = $('.filter_buttons');

  // these are the divs on the homepage that dynamically pull data from the database
  var you_image = $('.you_image');
  var friends_image = $('.friends_image');
  var everyone_image = $('.everyone_image');
  var j = [];

  // adds class active to css for you(if user logged in) and everyone (if no one is logged in)
  // creates markers for each scenario
  if ($('#current_user').length === 1) {
    you_button.addClass('active');
    createMarkers(you_image);
    createMarkersCont();
  }
  else {
    everyone_button.addClass('active');
    createMarkers(everyone_image);
  }


  // Depending on which button you click, the following logic keeps the checkboxes gray when you click on them, empties out the markers that were there before, and creates new markers.

  friends_button.click(function() {
    filter_buttons.removeClass('active');
    friends_button.addClass('active');
    j = [];
    createMarkers(friends_image);
    createMarkersCont();
  });

  everyone_button.click(function() {
    filter_buttons.removeClass('active');
    everyone_button.addClass('active');
    j = [];
    createMarkers(everyone_image);
    createMarkersCont();
  });

  you_button.click(function() {
    filter_buttons.removeClass('active');
    you_button.addClass('active');
    j = [];
    createMarkers(you_image);
    createMarkersCont();
  });


  // creates markers after accepting the argument of which divs from the index page to pull data from (you, friends, or everyone)

  function createMarkers(div) {
    div.each(function() {
      j.push({
        type: 'Feature',
        "geometry": {
          "type": "Point",
          // of note:  for some reason that lat/long need to be reversed here such that it is long/lat
          "coordinates": [this['dataset']['long'], this['dataset']['lat']]
          //[$(this).data('data-long'), $(this).data('data-lat')]
        }, // close geometry
        // This is for a custom marker on the map
        "properties": {
          "title": "This is where I realized . . .",
          "icon": {
            "iconUrl": this['dataset']['image'],
            "iconSize": [50, 50], // size of the icon
            "iconAnchor": [25, 25], // point of the icon which will correspond to marker's location
            "popupAnchor": [0, -25]  // point from which the popup should open relative to the iconAnchor
          },
          // These are the images for the photo display
          // Store the image url and caption in an array
          "images": [this['dataset']['image'], this['dataset']['caption']]
        }, //close properties
      }); // close push
    }); //close you_images function
  } // end of markers function


  // geoJson is the content of the marker icon and the images inside.  This is where we'll dynamically interact with them.

  function createMarkersCont() {
    var geoJson = {
      type: 'FeatureCollection',
      features: j
    };

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

  }

  geolocate();

  function geolocate() {
    if (navigator.geolocation) {
      map.locate();
    };
  };

  map.on('locationfound', function(e) {
      map.fitBounds(e.bounds);

      // var map = L.mapbox.map('map_container', 'examples.map-uci7ul8p', { zoomControl: false })
      //     .setView([37.7, -122.4183], 12);

      map.setView([e.latlng.lat, e.latlng.lng], 12);

      map.markerLayer.setGeoJSON({
          type: "Feature",
          geometry: {
              type: "Point",
              coordinates: [e.latlng.lng, e.latlng.lat]
          }
          // properties: {
          //     'marker-color': '#000',
          //     'marker-symbol': 'star-stroked'
          // }
      });

  });


});




