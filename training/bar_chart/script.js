var width = 300; //画布的宽度
var height = 300; //画布的高度

var data = [250, 210, 170, 130, 90],
  dataset = [1.2, 2.3, 0.9, 1.5, 3.3],
  colorSet = ["red", "blue", "green", "yellow", "black"];

var svg = d3.select("body") //选择文档中的body元素
  .append("svg") //添加一个svg元素
  .attr("width", width) //设定宽度
  .attr("height", height); //设定高度

var space = 10,
  rectHeight = (height - space * (dataset.length - 1)) / dataset.length;


//Scale: Linear
var linear = d3.scaleLinear()
  .domain([d3.min(dataset), d3.max(dataset)])
  .range([10, width - 30]);

//Scale: Ordinal
var ordinal = d3.scaleOrdinal()
  .domain(dataset)
  .range(colorSet);

//Coordinator: axis
var axisLinear = d3.scaleLinear()
  .domain([0, d3.max(dataset)])
  .range([0, width]);

var axis = d3.axisBottom(linear)
  .ticks(7);

svg.append('g')
  .attr("class", "axis")
  .call(axis);

var bar = svg.selectAll('.bar')
  .data(dataset, function(d) {
    return d;
  })
  .enter()
  .append('g')
  .attr('class', 'bar')

bar.append('rect')
  .attr('x', 0)
  .attr('width', function(d, i) {
    return linear(d);
  })
  .attr('height', rectHeight)
  .attr('y', function(d, i) {
    return 0;
  })
  .attr("fill", function(d, i) {
    return ordinal(d);
  })
  .transition()
  .delay(function(d, i) {
    return 200 * i;
  })
  .duration(1000)
  .ease(d3.easeBounce)
  .attr("y", function(d, i) {
    return i * (rectHeight + space);
  });

bar.append('text')
  .text(function(d, i) {
    return d;
  })
  .attr('x', function(d, i) {
    return linear(d) + 10;
  })
  .attr('y', function(d, i) {
    return i * (rectHeight + space) + rectHeight / 2;
  });
