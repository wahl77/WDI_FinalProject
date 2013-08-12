$(document).ready(function() {
  var map;

  // toggles the class on the filter buttons so that when they are clicked they look 'depressed', similarly when they are unclicked
  var depress_button = function() {
    $('.filter_buttons').click(function() {
      $(this).toggleClass('clicked');
    });
  };

  function make_map() {
    var show_pos = function(position){
      console.log(position);
      map = L.mapbox.map('map_container', 'examples.map-uci7ul8p', { zoomControl: false }).setView([position.coords.latitude, position.coords.longitude], 12);
      // Wait for callback to be finshed
      map_set();
    }

    var show_error = function(){
      map = L.mapbox.map('map_container', 'examples.map-uci7ul8p', { zoomControl: false });
      // Wait for callback to be finshed
      map_set();
    }


    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(show_pos, show_error);
    } else {
      map = L.mapbox.map('map_container', 'examples.map-uci7ul8p', { zoomControl: false });

      // Wait for callback to be finshed
      map_set();
    }
  }



  // Make sure you call this once the map set and displays on screen
  var map_set = function(){
    // moves the zoom controls the right side; defaults to 'topleft' if this line is left off.
    new L.Control.Zoom({ position: 'topright' }).addTo(map);
    // ******* Section that adds photos to the popups *************

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
      // Christina: attempting to set the value of the form to the caption of the picture, but not working for some reason. Form DOES submit a search properly when value is hard-coded, though.
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


    map.markerLayer.setGeoJSON(geoJson);
    map.markerLayer.setGeoJSON(geoJson2);
    depress_button();
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

  // 'search_insights' click returns an array of JSON objects that represents each photo and their respective conntent
  $('body').on('click', '#search_insights', function(){
    $.ajax({
      type: "POST",
      url: '/search',
      data: { search: $('.slideshow .image.active .caption').text() },
      dataType: "json"
    }).done(add_markers);
  });

  var marker = [];

  var add_markers = function(response) {
    for (var i = 0; i <= json_response.length; i++)
      marker.push({
        type: 'Feature',
        "geometry": {
          "type": "Point",
        // of note:  for some reason that lat/long need to be reversed here such that it is long/lat
        "coordinates": [json_response[i].long, json_response[i].lat]
        },
        "properties": {
          'title': 'When I... I realized...',
        'icon': {
          "iconUrl": json_response[i].url[0],
        "iconSize": [50, 50], // size of the icon
        "iconAnchor": [25, 25], // point of the icon which will correspond to marker's location
        "popupAnchor": [0, -25]  // point from which the popup should open relative to the iconAnchor
        },
        'images': [
        [json_response[i].url, json_response[i].caption]
        ]
        }
      }); // close geoJson/marker.push
  };

  var geoJson = {
    type: 'FeatureCollection',
    features: marker
  };
  var geoJson2 = [{
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
            ['http://i.imgur.com/O6QEpBs.jpg','Baby The U.S. Capitol after the burning of Washington during the War of 1812'],
            ['http://i.imgur.com/xND1MND.jpg','Ford\'s Theatre in the 19th century, site of the 1865 assassination of President Lincoln'],
            ['http://i.imgur.com/EKJmqui.jpg','TheNational Cherry Blossom Festival is celebrated around the city each spring.']
          ]
        }
    }]; // close kitten geoJson2



  // ********* All of our function calls: ***********

  // Add features to the map and sets each geoJson object

  // because 'prev' & 'next'/popup do not exist in the DOM yet, moveSlide doesn't work without a call on the body afterward.
  $('body').on('click', '.prev', moveSlide);
  $('body').on('click', '.next', moveSlide);

  make_map();


});


