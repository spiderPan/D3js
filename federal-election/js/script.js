var width = 1240,
    height = 1000;

var svg = d3.select('#map-canvas').append('svg')
    .attr('id', 'canada-map')
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(0,0)');

var projection = d3.geoMercator()
    .center([-96, 64])
    .scale(500)
    .translate([width / 2, height / 2]);

var color = d3.scaleOrdinal(d3.schemeCategory20);

var path = d3.geoPath().projection(projection);


d3.json('./data/canadian_electoral_districts_fo_real.json', function(error, data) {
    if (error) {
        return console.log(error);
    }

    svg.selectAll('path')
        .data(data.features)
        .enter()
        .append('path')
        .attr('stroke', '#000')
        .attr('stroke-width', 1)
        .attr('id', function(d, i) {
            return 'area-' + d.properties.number;
        })
        .attr('fill', function(d, i) {
            return color(i % 20);
        })
        .attr('d', path)
        .on('mouseover', function(d, i) {
            var number = d.properties.number,
                name = d.properties.name,
                province = d.properties.PROVCODE;

            d3.select('.area-number').text(number);
            d3.select('.area-name').text(name);
            d3.select('.area-province-code').text(province);
        });
});


d3.json('./data/election_results.json', function(error, data) {
    if (error) {
        return console.log(error);
    }
    for (var i in data) {
        svg.select('#area-' + i).attr('fill', function() {
            return data[i]['background-color'];
        });
    }
});
