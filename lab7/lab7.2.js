function init() {
  var w = 300;
  var h = 300;
  var padding = 50;
  var dataset = [5, 6, 10, 20, 25, 45];
  var outerRadius = w / 2;
  var innerRadius = 0;

  // Define the color scale 
  var color = d3.scaleOrdinal(d3.schemeCategory10);

  // arc generator
  var arc = d3.arc()
      .outerRadius(outerRadius)
      .innerRadius(innerRadius);

  // Define the pie layout
  var pie = d3.pie();

  // Create the SVG element 
  var svg = d3.select("#chart")
      .append("svg")
      .attr("width", w )
      .attr("height", h )
     
  // Bind data and create arcs
  var arcs = svg.selectAll("g.arc")
  .data(pie(dataset))
  .enter()
  .append("g")
  .attr("class", "arc")
  .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

  // Draw the arcs
  arcs.append("path")
      .attr("fill", function(d, i) {
          return color(i);
      })
      .attr("d", arc);

  // Add labels
  arcs.append("text")
      .text(function(d) {
          return d.data; 
      })
      .attr("transform", function(d) {
          return "translate(" + arc.centroid(d) + ")";
      })
      .attr("text-anchor", "middle") // Center the text
      .attr("font-size", "18px")
      .attr("font-weight", "bold");
     
}

window.onload = init;
