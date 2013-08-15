$(document).ready(function(){

  var map;

  function make_map() {
    var show_pos = function(position){
      map = L.mapbox.map('map_container', 'examples.map-uci7ul8p', { zoomControl: false }).setView([position.coords.latitude, position.coords.longitude], 12);
      new L.Control.Zoom({ position: 'topright' }).addTo(map);
      map.addLayer(L.tileLayer('http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg'));

      if(window.location.href.indexOf("map_location") > -1){
        var marker = L.marker(new L.LatLng(position.coords.latitude, position.coords.longitude), {
                        icon: L.mapbox.marker.icon({'marker-color': 'CC0033','marker-symbol': 'star-stroked',}),
                        draggable: true
                    });
        marker.bindPopup('<button> Save Your Location </button>');
        marker.addTo(map);
        $('body').find('img').css('src', "http://a.tiles.mapbox.com/v3/marker/pin-m-star-stroked+CC0033.png").attr('id', 'christina_unstyled');
        $('body').on('click', '.leaflet-popup-content-wrapper', function(){
          $.ajax({
            type: "GET",
            url: '/save_location',
            data: { lat: marker._latlng.lat, lng: marker._latlng.lng, url: window.location.href },
          }).done(notify_saved);
        });
        var notify_saved = function() {
          $('.leaflet-popup-content').text('Location Saved!');
          // map.removeLayer(marker);
          window.location = "/";
          // $('body').find('img').css('src', "http://a.tiles.mapbox.com/v3/marker/pin-m-star-stroked+CC0033.png").hide();
        };
      }

      // Wait for callback to be finshed
      map_set();
    };

    var show_error = function(){
      map = L.mapbox.map('map_container', 'examples.map-uci7ul8p', { zoomControl: false });
      new L.Control.Zoom({ position: 'topright' }).addTo(map);
      map.addLayer(L.tileLayer('http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg'));

      // Wait for callback to be finshed
      map_set();
    };


    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(show_pos, show_error);
    }
    else {
      map = L.mapbox.map('map_container', 'examples.map-uci7ul8p', { zoomControl: false });
      new L.Control.Zoom({ position: 'topright' }).addTo(map);
      map.addLayer(L.tileLayer('http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg'));

      // Wait for callback to be finshed
      map_set();
    }
  }


  //  This example uses jQuery to make selecting items in the slideshow easier.
  //  Download it from http://jquery.com
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

  // ************ dynamically creating the geoJson objects to render multiple markers and images in each popup **************

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
    // map_set();
  }
  else {
    everyone_button.addClass('active');
    createMarkers(everyone_image);
    // map_set();
  }


//    // Create custom popup content
//    var popupContent =
//      '<div id="' + feature.properties.id + '" class="popup">' +
//        '<h2>' + feature.properties.title + '</h2>' +
//        '<div id="makeMeScrollable" class="slideshow">' + slideshowContent + '</div>' +
//        '<div class="cycle">' +
//          '<a href="#" class="prev" >&laquo; Previous</a>' +
//          '<a href="#" class="next" >Next &raquo;</a>' +
//        '</div>' +
//        '<button id="search_insights"> Search Similar Insights </button>'
//      '</div>';
//
//
//
//    // http://leafletjs.com/reference.html#popup
//    marker.bindPopup(popupContent,{
//      closeButton: false,
//      minWidth: 320
//    });
//
  // Depending on which button you click, the following logic keeps the checkboxes gray when you click on them, empties out the markers that were there before, and creates new markers.

  friends_button.click(function() {
    filter_buttons.removeClass('active');
    friends_button.addClass('active');
    j = [];
    createMarkers(friends_image);
    map_set();
  });

  everyone_button.click(function() {
    filter_buttons.removeClass('active');
    everyone_button.addClass('active');
    j = [];
    createMarkers(everyone_image);
    map_set();
  });

  you_button.click(function() {
    filter_buttons.removeClass('active');
    you_button.addClass('active');
    j = [];
    createMarkers(you_image);
    map_set();
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
          "title": "Here, I realized . . .",
          "icon": {
            "iconUrl": this['dataset']['image'],
            "iconSize": [50, 50], // size of the icon
            "iconAnchor": [25, 25], // point of the icon which will correspond to marker's location
            "popupAnchor": [0, -25]  // point from which the popup should open relative to the iconAnchor
          },
          // These are the images for the photo display
          // Store the image url and caption in an array
          "images": [[this['dataset']['image'], this['dataset']['caption']]]
        }, //close properties
      }); // close push
    }); //close you_images function
  } // end of markers function



  function map_set() {
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
      // ********* All of our function calls: ***********

      // Add features to the map and sets each geoJson object

      for(var i = 0; i < images.length; i++) {
        var img = images[i];

        slideshowContent +=
          '<div class="image' + (i === 0 ? ' active' : '') + '">' +
            '<img src="' + img[0] + '" />' +
            '<div class="caption">' + img[1] + '</div>' +
          '</div>';
      }

      // Create custom popup content
      // commented out previous next divs in case we want to integrate in the future
      var popupContent =
        '<div id="' + feature.properties.id + '" class="popup">' +
          '<h2>' + feature.properties.title + '</h2>' +
          '<div class="slideshow">' + slideshowContent + '</div>' +
          '<div class="cycle">' +
            // '<a href="#" class="prev" >&laquo; Previous</a>' +
            // '<a href="#" class="next" >Next &raquo;</a>' +
          '</div>' +
          '<button id="search_insights"> Search Similar Insights </button>'
        '</div>';

      // http://leafletjs.com/reference.html#popup
      marker.bindPopup(popupContent,{
        closeButton: false,
        minWidth: 320
      });
    });

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




// 1) set location in routes
// 2) set controller action
// 3) splice by "/"
// 4) find image id and save lat and long
// 5) redirect to home

    // Add features to the map
    map.markerLayer.setGeoJSON(geoJson);
  }

    // because 'prev' & 'next'/popup do not exist in the DOM yet, moveSlide doesn't work without a call on the body afterward.
    $('body').on('click', '.prev', moveSlide);
    $('body').on('click', '.next', moveSlide);

  make_map();
});
