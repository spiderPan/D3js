jQuery(function ($) {
    var map = new google.maps.Map(d3.select("#d3-map").node(), {
        mapTypeId: 'satellite'
    });

    var heatmap,
        markers         = [],
        prev_infowindow = false,
        bounds          = new google.maps.LatLngBounds();

    d3.json("data/converted_data_with_geocoding.json", function (error, data) {
        if (error) {
            return console.warn(error);
        }
        var points = [];
        for (var i = 0; i < data.length; i++) {
            var current       = data[i],
                geo_location  = current['geocode'],
                google_latlng = new google.maps.LatLng(geo_location),
                single_marker = new google.maps.Marker({
                    position: google_latlng,
                    title   : current['name'][0],
                }),
                infoWindow    = new google.maps.InfoWindow();

            points.push(google_latlng);
            markers.push(single_marker);
            bounds.extend(google_latlng);

            google.maps.event.addListener(single_marker, 'click', (function (marker, location, infowindow) {
                return function () {
                    if (prev_infowindow) {
                        prev_infowindow.close();
                    }
                    var content = '<div class="panel panel-default">' +
                        '<div class="panel-heading">' +
                        '<h3 class="panel-title">' + location['region'][0] + '</h3>' +
                        '</div>' +
                        '<div class="panel-body">' +
                        '<p>地址：' + location['address'][0] +
                        '<br>经理：' + location['manager'][0] +
                        '</p>' +
                        '</div>' +
                        '</div>';

                    prev_infowindow = infowindow;
                    infowindow.setContent(content);
                    infowindow.open(map, marker);
                };
            })(single_marker, current, infoWindow));

        }
        map.fitBounds(bounds);
        heatmap = new google.maps.visualization.HeatmapLayer({
            data       : points,
            map        : map,
            gradient   : [
                'rgba(0, 255, 255, 0)',
                'rgba(0, 255, 255, 1)',
                'rgba(0, 191, 255, 1)',
                'rgba(0, 127, 255, 1)',
                'rgba(0, 63, 255, 1)',
                'rgba(0, 0, 255, 1)',
                'rgba(0, 0, 223, 1)',
                'rgba(0, 0, 191, 1)',
                'rgba(0, 0, 159, 1)',
                'rgba(0, 0, 127, 1)',
                'rgba(63, 0, 91, 1)',
                'rgba(127, 0, 63, 1)',
                'rgba(191, 0, 31, 1)',
                'rgba(255, 0, 0, 1)'
            ],
            radius     : 20,
            dissipating: true,
        });
    });

    $('.btn').on('click', function () {
        var _this = $(this);

        _this.toggleClass('active');

        if (_this.hasClass('heatmap')) {
            toggleHeatmap();
        } else if (_this.hasClass('marker')) {
            toggleMarkers();
        }
    });

    function toggleMarkers() {
        if (markers[0].getMap() != null) {
            var arg = null;
        } else {
            var arg = map;
        }
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(arg);
        }
    }

    function toggleHeatmap() {
        if (heatmap.getMap() != null) {
            heatmap.setMap(null);
        } else {
            heatmap.setMap(map);
        }
    }
});

