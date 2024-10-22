function init() {
    var w = 500;
    var h = 300;

    var projection = d3.geoMercator()
        .center([145, -36.5])
        .translate([w / 2, h / 2])
        .scale(2450);

    var color = d3.scaleQuantize()
        .range(['#f2f0f8', '#cbc9e2', '#9e9ac8', '#756bb1', '#54278f']);  

    var path = d3.geoPath()
        .projection(projection);

    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    // Create a tooltip div that is hidden by default
    var tooltip = d3.select("body").append("div")   
        .attr("class", "tooltip")               
        .style("position", "absolute")
        .style("opacity", 0)
        .style("background", "lightsteelblue")
        .style("padding", "5px")
        .style("border-radius", "5px")
        .style("pointer-events", "none");

    // Load unemployment data
    d3.csv("VIC_LGA_unemployment.csv", function (d) {
        return {
            LGA: d.LGA,
            unemployed: +d.unemployed
        };
    }).then(function (data) {

        d3.json("LGA_VIC.json").then(function (json) {

            // Merge CSV data with JSON
            for (var i = 0; i < data.length; i++) {
                var dataState = data[i].LGA;
                var dataValue = parseFloat(data[i].unemployed);

                for (var j = 0; j < json.features.length; j++) {
                    var jsonState = json.features[j].properties.LGA_name;

                    if (dataState == jsonState) {
                        json.features[j].properties.unemployed = dataValue;
                        break;
                    }
                }
            }

            color.domain([d3.min(json.features, function (d) { return d.properties.unemployed; }),
            d3.max(json.features, function (d) { return d.properties.unemployed; })]);

            svg.selectAll("path")
                .data(json.features)
                .enter()
                .append("path")
                .attr("d", path)
                .style("fill", function (d) {
                    var value = d.properties.unemployed;
                    return value ? color(value) : "#ccc";
                });

        });

        // Load Victorian cities
        d3.csv("VIC_city.csv", function (d) {
            return {
                place: d.place,
                lat: +d.lat,
                lon: +d.lon
            };
        }).then(function (data) {

            // Add circles for cities
            svg.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", function (d) {
                    return projection([d.lon, d.lat])[0];
                })
                .attr("cy", function (d) {
                    return projection([d.lon, d.lat])[1];
                })
                .attr("r", 3)  // Adjusted circle radius for better visibility
                .style("fill", "red")
                .on("mouseover", function (event, d) {  // Show tooltip on hover
                    tooltip.transition()        
                        .duration(200)      
                        .style("opacity", .9);      
                    tooltip.html(d.place)  
                        .style("left", (event.pageX + 5) + "px")     
                        .style("top", (event.pageY - 28) + "px");    
                })
                .on("mouseout", function (d) {  // Hide tooltip when not hovering
                    tooltip.transition()        
                        .duration(500)      
                        .style("opacity", 0);   
                });
        });
    });
}

window.onload = init;
