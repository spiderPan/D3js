var map = new google.maps.Map(d3.select("#d3-map").node(), {
    zoom     : 6,
    center   : new google.maps.LatLng(42.9878072, -81.2849162),
    mapTypeId: google.maps.MapTypeId.TERRAIN
});
var timer = 3;

d3.json("data/location-data.json", function (error, data) {
    var overlay = new google.maps.OverlayView();

// Add the container when the overlay is added to the map.
    overlay.onAdd = function () {
        var layer = d3.select(this.getPanes().overlayLayer).append("div")
            .attr("class", "stations");

        // Draw each marker as a separate SVG element.
        // We could use a single SVG, but what size would it have?
        overlay.draw = function (date) {
            var projection = this.getProjection(),
                padding    = 10;

            var marker = layer.selectAll("svg")
                .data(d3.entries(data))
                .enter()
                .filter(function (d) {
                    return d.value.start_date === date;
                })
                .each(transform) // update existing markers
                .enter().append("svg")
                .each(transform)
                .attr("class", "marker");

            // Add a circle.
            marker.append("circle")
                .attr("r", 4.5)
                .attr("cx", padding)
                .attr("cy", padding);

            // Add a label.
            marker.append("text")
                .attr("x", padding + 7)
                .attr("y", padding)
                .attr("dy", ".31em")
                .text(function (d) {
                    return d.value.start_date;
                });

            function transform(d) {
                d = new google.maps.LatLng(d.value.lat, d.value.lng);
                d = projection.fromLatLngToDivPixel(d);
                return d3.select(this)
                    .style("left", (d.x - padding) + "px")
                    .style("top", (d.y - padding) + "px");
            }
        };

        d3.timer(overlay.draw)
    };

    // Bind our overlay to the map…
    overlay.setMap(map);
});

