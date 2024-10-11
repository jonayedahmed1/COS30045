// Button click handlers
d3.select("#Add")
.on("click", function (){
    Add();
});

d3.select("#Remove")
.on("click", function (){
    remove();
});
var dataset = [24,10,29,19,8,15,20,12,9,6,21,28];
var w =500;
var h=200;
var maxValues = 25;
var padding = 20;

//function for adding bars
function Add(){
var newNumber = Math.floor(Math.random()*maxValues);
dataset.push(newNumber);

// Update yScale domain based on the new data
yScale.domain([0, d3.max(dataset)]);
xScale.domain(d3.range(dataset.length));



// Update bars
var bars = svg.selectAll("rect")
    .data(dataset)
    

bars.enter()
    .append("rect")
    .attr("fill", "skyblue")
    .attr("x",w)
    .attr("y",function(d){
        return h - yScale(d);
    })
    .merge(bars)
    .transition()
    .duration(500)
    .attr("x", function(d,i){
        return xScale(i)
    })
    .attr("y", function(d){
        return h - yScale(d);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function(d){
        return yScale(d) - padding;
    })
}
// function to remove the bar
function remove(){

yScale.domain([0, d3.max(dataset)]);
xScale.domain(d3.range(dataset.length));



// Update bars
var bars = svg.selectAll("rect")
    .data(dataset)

dataset.shift();

bars.exit()
    .transition()
    .duration(500)
    .attr("x",w)
    .remove();
}

var xScale = d3.scaleBand()
            .domain(d3.range(dataset.length))
            .rangeRound([padding , w])
            .paddingInner(0.05);

var yScale = d3.scaleLinear()
            .domain([0, d3.max(dataset)])
            .rangeRound([h - padding , 0 ])

var svg = d3.select("body")
        .append("svg")
        .attr("width",w)
        .attr("height", h + 30);

        
svg.selectAll("rect")
.data(dataset)
.enter()
.append("rect")
.attr("fill", "skyblue")
.attr("x", function(d, i) {
    return xScale(i);  // Use xScale for x-position
})
.attr("y", function(d) {
    return yScale(d);  // Use yScale for y-position
})
.attr("width", xScale.bandwidth())
.attr("height", function(d) {
    return h - yScale(d) - padding;
});;
