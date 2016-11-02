var width = 1240;
var height = 1000;

var svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('id', 'canada-map')
    .append('g')
    .attr('transform', 'translate(0,0)');

var projection = d3.geoMercator()
    .center([-96, 64])
    .scale(500)
    .translate([width / 2, height / 2]);

var path = d3.geoPath()
    .projection(projection);

var color = d3.scaleOrdinal(d3.schemeCategory20),
    flagColor = ['#ff0000', '#ffffff'];

d3.json('./data/Canada.json', function(error, root) {
    if (error) {
        return console.error(error);
    }
    console.log(root.features);

    svg.selectAll('path')
        .data(root.features.sort(function(a, b) {
            var timeA = new Date(a.properties.confederation_date).getTime() / 1000,
                timeB = new Date(b.properties.confederation_date).getTime() / 1000
            return timeA - timeB;
        }))
        .enter()
        .append('path')
        .attr('stroke', '#000')
        .attr('stroke-width', 1)
        .attr('fill', function(d, i) {
            return color(i);
        })
        .attr('d', path)
        .on('mouseover', function(d, i) {
            d3.select(this)
                .attr('fill', 'yellow');
        })
        .on('mouseout', function(d, i) {
            d3.select(this)
                .attr('fill', color(i));
        });

    svg.selectAll('text')
        .data(root.features)
        .enter()
        .append('svg:text')
        .text(function(d) {
            return d.properties.name;
        })
        .attr('x', function(d) {
            return path.centroid(d)[0];
        })
        .attr('y', function(d) {
            return path.centroid(d)[1];
        })
        .attr('text-anchor', 'middle')
        .attr('font-size', '6pt');
});
