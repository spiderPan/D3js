var width = 1240,
    height = window.innerHeight;
var svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('id', 'canada-map')
    .append('g')
    .attr('transform', 'translate(0,0)');



d3.queue()
    .defer(d3.json, "./data/Canada.json")
    .defer(d3.json, "./data/confederation-date.json")
    .await(analyze);

function analyze(error, canadaProvince, confederationDate) {
    if (error) {
        console.log(error);
        throw error;
    }
    var provinces = canadaProvince.features,
        dateArray = [];

    confederationDate.forEach(function(confederation) {
        var join_date = new Date(confederation.date).getTime() / 1000;
        dateArray.push(join_date);
    });

    var linearScale = d3.scaleQuantize()
        .domain([d3.min(dateArray), d3.max(dateArray)])
        .range([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    provinces.forEach(function(province) {
        confederationDate.forEach(function(confederation) {
            if (confederation.name === province.properties.name) {
                province.properties.join_date = confederation.date;
                province.properties.join_order = linearScale(new Date(confederation.date).getTime() / 1000);
            }
        });
    });

    drawMap(canadaProvince);
}

function drawMap(root) {
    var azimuthalprojection = d3.geoAzimuthalEqualArea()
        .rotate([100, -45])
        .center([5, 20])
        .scale(800)
        .translate([width / 2, height / 2]);

    var path = d3.geoPath().projection(azimuthalprojection);

    var color = d3.scaleOrdinal(d3.schemeCategory20),
        flagColor = ['#ff0000', '#ffffff'];

    svg.selectAll('path')
        .data(root.features.sort(function(a, b) {
            var timeA = new Date(a.properties.join_date).getTime() / 1000,
                timeB = new Date(b.properties.join_date).getTime() / 1000;
            return timeA - timeB;
        }))
        .enter()
        .append('path')
        .attr('stroke', '#000')
        .attr('stroke-width', 1)
        .transition()
        .delay(function(d, i) {
            console.log(d.properties.join_order);
            return d.properties.join_order * 2000;
        })
        .attr('alt', function(d, i) {
            return d.properties.name;
        })
        .attr('fill', function(d, i) {
            return color(i);
        })
        .attr('d', path);
    // .on('mouseover', function(d, i) {
    //     d3.select(this)
    //         .attr('fill', 'yellow');
    // })
    // .on('mouseout', function(d, i) {
    //     d3.select(this)
    //         .attr('fill', color(i));
    // });

    svg.selectAll('text')
        .data(root.features)
        .enter()
        .append('svg:text')
        .text(function(d) {
            return d.properties.name + ' ' + d.properties.join_date;
        })
        .attr('x', function(d) {
            return path.centroid(d)[0];
        })
        .attr('y', function(d) {
            return path.centroid(d)[1];
        })
        .attr('text-anchor', 'middle')
        .attr('font-size', '6pt');
}
