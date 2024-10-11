
d3.select("#chartbutton")
.on("click", function (){
    updateChart();
});

var w = 500;
var h = 200;
var padding = 25;
var maxValues = 25;
var dataset = [24,10,29,19,8,15,20,12,9,6,21,28];  // Initial dataset

function updateChart(){
var numValues = dataset.length;

dataset = [];
for (let i = 0; i < numValues; i++){
    let newNumber = Math.floor(Math.random() * maxValues);
    dataset.push(newNumber);
}

// Update the yScale domain with the new data
yScale.domain([0, d3.max(dataset)]);

// Update bars
svg.selectAll("rect")
    .data(dataset)
    .attr("y", function(d) {
        return yScale(d);
    })
    .attr("height", function(d) {
        return h - yScale(d) - padding;
    });

// Update the text labels
svg.selectAll("text")
    .data(dataset)
    .text(function(d) {
        return d;
    })
    .attr("y", function(d) {
        return yScale(d) + 15;
    });
}

var xScale = d3.scaleBand()
            .domain(d3.range(dataset.length))
            .rangeRound([padding, w])
            .paddingInner(0.05);

var yScale = d3.scaleLinear()
            .domain([0, d3.max(dataset)])
            .rangeRound([h - padding, 0]);

var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h + 30);

//  draw the bars
svg.selectAll("rect")
.data(dataset)
.enter()
.append("rect")
.attr("fill", "skyblue")
.attr("x", function(d, i) {
    return xScale(i);  // use the xScale for x-position
})
.attr("y", function(d) {
    return yScale(d);  // use the yScale for y-position
})
.attr("width", xScale.bandwidth())
.attr("height", function(d) {
    return h - yScale(d) - padding;
});

//  draw the text labels 
svg.selectAll("text")
.data(dataset)
.enter()
.append("text")
.text(function(d) {
    return d;
})
.attr("fill", "black")
.attr("x", function(d, i) {
    return xScale(i) + xScale.bandwidth() / 2;
})
.attr("y", function(d) {
    return yScale(d) + 15;
})
.attr("text-anchor", "middle");