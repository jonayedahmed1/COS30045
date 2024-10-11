// Dataset and chart dimensions
var dataset = [24, 10, 29, 19, 8, 15, 20, 12, 9, 6, 21, 28];
var w = 500;
var h = 200;
var maxValues = 25;
var padding = 20;
var barWidth = w / dataset.length;

// SVG container
var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

// draw bars 
svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("fill", "skyblue")
    .attr("x", function(d, i) {
        return i * barWidth;
    })
    .attr("y", function(d) {
        return h - d * 5;  
    })
    .attr("width", barWidth - 2)  
    .attr("height", function(d) {
        return d * 5;  
    });

//  labels
svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function(d) {
        return d;
    })
    .attr("fill", "black")
    .attr("x", function(d, i) {
        return i * barWidth + (barWidth / 2);
    })
    .attr("y", function(d) {
        return h - (d * 5) + 15;
    })
    .attr("text-anchor", "middle");


// Function to update the chart with new random data and ease type
function updateChart(easeType){
    var numValues = dataset.length;

    dataset = [];
    for (let i = 0; i < numValues; i++) {
        let newNumber = Math.floor(Math.random() * maxValues);
        dataset.push(newNumber);
    }

    // Update bars with new data
    svg.selectAll("rect")
        .data(dataset)
        .transition()
        .delay(function(d, i) {
            return i / dataset.length * 100;
        })
        .duration(2000)
        .ease(easeType)  
        .attr("y", function(d) {
            return h - d * 5;
        })
        .attr("height", function(d) {
            return d * 5;
        });

    // Update text labels
    svg.selectAll("text")
        .data(dataset)
        .text(function(d) {
            return d;
        })
        .transition()
        .duration(2000)
        .ease(easeType)  
        .attr("y", function(d) {
            return h - d * 5 + 15;
        });
}

// Button click handlers
d3.select("#updatebutton").on("click", function () {
    updateChart(d3.easeCubicInOut);  //  default ease function for updates
});

d3.select("#transition1").on("click", function() {
    updateChart(d3.easeCircleIn);  // First transition: Ease Circle In
});

d3.select("#transition2").on("click", function() {
    updateChart(d3.easeElasticOut);  // Second transition: Ease Elastic Out
});
