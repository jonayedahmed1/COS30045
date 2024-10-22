function init() {
    var w = 600
    var h = 300
    var padding = 53;
    var dataset, xScale, yScale, line, area, areaPath;

    // Load CSV data
    d3.csv("Unemployment_78-95.csv", function(d) {
        return {
            date: new Date(+d.year, +d.month - 1), 
            number: +d.number
        };
    })
    .then(function(data) {
        dataset = data;
        console.log("Loaded data:", dataset); // Check if data loads
        console.table(dataset, ["date", "number"]);
        lineChart(dataset); // Call lineChart with loaded data
    });

    function lineChart(dataset) {
        // Create SVG container
        const svg = d3.select("#chart")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

        // Define scales
        xScale = d3.scaleTime()
            .domain(d3.extent(dataset, d => d.date))
            .range([padding, w - padding]);

        // Adjust yScale domain to include 500000
        yScale = d3.scaleLinear()
            .domain([0, Math.max(d3.max(dataset, d => d.number), 500000)])
            .range([h - padding, padding]);

        // Define line generator
        line = d3.line()
            .x(function(d){return xScale(d.date);})
            .y(function(d){return yScale(d.number);});

        // Define area generator
        area = d3.area()
            .x(d => xScale(d.date))
            .y0(yScale(0)) // Corrected y0 accessor
            .y1(d => yScale(d.number));

        // Append area path
        areaPath = svg.append("path")
            .datum(dataset)
            .attr("class", "area")
            .attr("d", area)
            .attr("fill", "steelblue")
            .attr("opacity", 1); // Initialize opacity

        // Append line path
        svg.append("path")
            .datum(dataset)
            .attr("class", "line")
            .attr("d", line)
            .attr("fill", "none")
            .attr("stroke", "black");

        // Define and append axes
        const xAxis = d3.axisBottom(xScale).ticks(10);
        const yAxis = d3.axisLeft(yScale).ticks(10);

        svg.append("g")
            .attr("transform", `translate(0, ${h - padding})`)
            .call(xAxis);

        svg.append("g")
            .attr("transform", `translate(${padding}, 0)`)
            .call(yAxis);

        // Add a custom line at y = 500,000
        svg.append("line")
            .attr("class", "line halfMilMark")
            .attr("x1", padding)
            .attr("y1", yScale(500000))
            .attr("x2", w - padding)
            .attr("y2", yScale(500000))
            .style("stroke", "red") // Set stroke color to red
            .style("stroke-dasharray", "2,2"); // Create a dotted effect

        // Add a label for the custom line
        svg.append("text")
            .attr("class", "halfMilLabel")
            .attr("x", padding + 10)
            .attr("y", yScale(500000) - 7)
            .text("Half a million unemployed")
            .attr("fill", "red"); // Set label color to red

        // Toggle area visibility on button click
        const toggleButton = document.getElementById("toggleArea");
        if(toggleButton){
            toggleButton.addEventListener("click", function() {
                const currentOpacity = parseFloat(areaPath.attr("opacity"));
                areaPath.transition().duration(500)
                    .attr("opacity", currentOpacity === 1 ? 0 : 1);
            });
        } else {
            console.warn("Toggle button with id 'toggleArea' not found.");
        }
    }
}

window.onload = init;
