var width = $('#map-canvas').width(),
    height = window.innerHeight,
    svg = d3.select('#map-canvas')
    .append('svg')
    .attr('id', 'canada-map')
    .attr('width', width)
    .attr('height', height);

d3.queue()
    .defer(d3.json, "./data/canadian_electoral_districts_fo_real.json")
    .defer(d3.json, "./data/election_results.json")
    .await(analyze);

function analyze(error, districtsData, resultsData) {
    var districts = districtsData.features;
    districts.forEach(function(district) {
        var result = resultsData[district.properties.number];
        district.properties.result = result;
    });

    drawMap(districtsData);
}


function drawMap(districts) {

    var azimuthalprojection = d3.geoAzimuthalEqualArea()
        .rotate([100, -45])
        .center([5, 20])
        .scale(800)
        .translate([width / 2, height / 2]);
    // var center = d3.geoCentroid(districts),
    //     originalScale = 150;
    // var projection = d3.geoMercator().center(center).scale(originalScale).translate([width / 2, height / 2]);
    // var path = d3.geoPath().projection(projection);
    // var bounds = path.bounds(districts),
    //     hscale = originalScale * width / (bounds[1][0] - bounds[0][0]),
    //     vscale = originalScale * height / (bounds[1][1] - bounds[0][1]),
    //     scale = (hscale < vscale) ? hscale : vscale,
    //     offset = [width - (bounds[0][0] + bounds[1][0]) / 2,
    //         height - (bounds[0][1] + bounds[1][1]) / 2
    //     ];

    // projection = d3.geoMercator().center(center)
    //     .scale(scale).translate(offset);
    var path = d3.geoPath().projection(azimuthalprojection);

    svg.selectAll('path')
        .data(districts.features)
        .enter()
        .append('path')
        .attr('stroke', '#000')
        .attr('stroke-width', 1)
        .attr('id', function(d, i) {
            return 'area-' + d.properties.number;
        })
        .attr('fill', function(d, i) {
            return d.properties.result['background-color'];
        })
        .attr('d', path)
        .on('mouseover', function(d, i) {
            var result = d.properties.result.tooltip.text;

            d3.select('.area-result').html(result);
        })
        .call(d3.zoom().scaleExtent([1, 10]).on("zoom", function() {
            svg.attr('transform', 'translate(' + d3.event.transform.x + ',' + d3.event.transform.y + ') scale(' + d3.event.transform.k + ')');
        }));
}
