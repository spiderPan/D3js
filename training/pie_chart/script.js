var dataset = [30, 10, 43, 55, 13];
var piedata = d3.pie()(dataset);
var outerRadius = 150,
  innerRadius = 0;
var width = 300; //画布的宽度
var height = 500; //画布的高度

var arc = d3.arc()
  .innerRadius(innerRadius)
  .outerRadius(outerRadius);

var svg = d3.select("body") //选择文档中的body元素
  .append("svg") //添加一个svg元素
  .attr("width", width) //设定宽度
  .attr("height", height);

var color = d3.scaleOrdinal(d3.schemeCategory10);

var arcs = svg.selectAll('g')
  .data(piedata)
  .enter()
  .append('g')
  .attr('transform', 'translate(' + (width / 2) + "," + (height / 2) + ')');

arcs.append('path')
  .attr('fill', function(d, i) {
    return color(i);
  })
  .attr('d', function(d) {
    return arc(d);
  });

arcs.append('text')
  .attr('transform', function(d) {
    return 'translate(' + arc.centroid(d) + ')';
  })
  .attr('text-anchor', 'middle')
  .text(function(d) {
    return d.data;
  })
