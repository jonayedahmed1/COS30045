
        var w = 500;
        var h = 200;
        var padding = 40;

        var dataset = [
            [2, 8],
            [3,5],
            [5, 17],
            [6, 6],
            [6, 12],
            [7,20],
            [8, 22],
            [10, 11],
            [5, 12],
            [6, 16]
        ];

      
        var xScale = d3.scaleLinear()
            .domain([d3.min(dataset, function(d) {
                 return d[0]; }),
                     d3.max(dataset, function(d) {
                 return d[0]; })])
            .range([padding, w - padding]);


        var yScale = d3.scaleLinear()
            .domain([d3.min(dataset, function(d) { 
                return d[1]; }),
                     d3.max(dataset, function(d) {
                 return d[1]; })])
            .range([h - padding, padding]);

            var xAxis = d3.axisBottom()
            .ticks(5)
            .scale(xScale);

            var yAxis = d3.axisLeft()
            .ticks(5)
            .scale(yScale);

            




        var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

        //  circles
        svg.selectAll("circle")
            .data(dataset)
            .enter()
            .append("circle")
            .attr("cx", function(d) {
                return xScale(d[0]);
            })
            .attr("cy", function(d) {
                return yScale(d[1]);
            })
            .attr("r", 3)
            .attr("fill", function(d) {
                return d[0] >= 500 ? "red" : "slategrey";
            });

        
        svg.selectAll("text")
            .data(dataset)
            .enter()
            .append("text")
            .text(function(d) {
                return d[0] + "," + d[1];
            })
            .attr("x", function(d) {
                return xScale(d[0]) + 5; 
            })
            .attr("y", function(d) {
                return yScale(d[1]) - 5;  
            })
            .attr("font-size", "12px")
            .attr("fill", "green");

            svg.append("g")
            .attr("transform", "translate(0, "+(h - padding+10) +")")
            .call(xAxis);
            
            svg.append("g")
            .attr("transform", "translate(" +padding+ ","+(10) +")")
            .call(yAxis);

// Add X axis label:
svg.append("text")
    .attr("text-anchor", "middle")
    .attr("x", (w -50))  
    .attr("y", h - 3)   
    .text("Tree Age (year)")
    .style("font-size", "14px")
    .style("font-weight", "bold");

// Y axis label:
svg.append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .attr("y", padding - 30)  
    .attr("x", -(h / 2))      
    .text("Tree Height (m)")
    .style("font-size", "14px")
    .style("font-weight", "bold");
