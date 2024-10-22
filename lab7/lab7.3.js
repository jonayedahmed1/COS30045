function init() {
  var w = 300;
  var h = 300;
  var padding = 100; 

  var dataset = [
      { apples: 5, oranges: 10, grapes: 22 },
      { apples: 4, oranges: 12, grapes: 28 },
      { apples: 2, oranges: 19, grapes: 32 },
      { apples: 7, oranges: 23, grapes: 35 },
      { apples: 23, oranges: 17, grapes: 43 }
  ];

  var stack = d3.stack().keys(["apples", "oranges", "grapes"]);
  var series = stack(dataset);

  var svg = d3.select("#chart")
      .append("svg")
      .attr("width", w + padding)
      .attr("height", h + padding);

  var color = d3.scaleOrdinal(d3.schemeCategory10);

  var groups = svg.selectAll("g")
      .data(series)
      .enter()
      .append("g")
      .style("fill", function(d, i) {
          return color(i);
      });

  var yScale = d3.scaleLinear()
      .domain([0, d3.max(dataset, function(d) {
          return d.apples + d.oranges + d.grapes;
      })])
      .range([h, 0]);

  var xScale = d3.scaleBand()
      .domain(dataset.map(function(d, i) {
          return i;
      }))
      .range([0, w])
      .padding(0.05);

  // Draw rectangles for the stacked bars
  var rects = groups.selectAll("rect")
      .data(function(d) { return d; })
      .enter()
      .append("rect")
      .attr("x", function(d, i) {
          return xScale(i);
      })
      .attr("y", function(d, i) {
          return yScale(d[1]);
      })
      .attr("height", function(d) {
          return yScale(d[0]) - yScale(d[1]);
      })
      .attr("width", xScale.bandwidth());

  // Add a legend
  var legend = svg.selectAll(".legend")
      .data(["apples", "oranges", "grapes"])
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) {
          return "translate(0," + (i * 20) + ")";
      });
//add legend 
  legend.append("rect")
      .attr("x", w + 10)  
      .attr("y", 10)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", function(d, i) {
          return color(i);
      });
// add the legend text
  legend.append("text")
      .attr("x", w + 35)  
      .attr("y", 19)
      .attr("dy", ".35em")
      .style("text-anchor", "start")
      .text(function(d) { return d; });
}

window.onload = init;
