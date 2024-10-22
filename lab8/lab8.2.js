function init() {
    var w = 500;
    var h = 300;

    var projection = d3.geoMercator()
        .center([145, -36.5])
        .translate([w / 2, h / 2])
        .scale(2450);

    var color = d3.scaleQuantize()
        .range(['#f2f0f8', '#cbc9e2', '#9e9ac8', '#756bb1', '#54278f']);

    var path = d3.geoPath().projection(projection);

    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    var mapLayer = svg.append("g");
    var cityLayer = svg.append("g");

    // Load unemployment data
    d3.csv("VIC_LGA_unemployment.csv", function (d) {
        return { LGA: d.LGA, unemployed: +d.unemployed };
    }).then(function (data) {
        d3.json("LGA_VIC.json").then(function (json) {
            data.forEach(function (d) {
                var match = json.features.find(f => f.properties.LGA_name === d.LGA);
                if (match) {
                    match.properties.unemployed = d.unemployed;
                }
            });

            color.domain([
                d3.min(json.features, d => d.properties.unemployed),
                d3.max(json.features, d => d.properties.unemployed)
            ]);

            mapLayer.selectAll("path")
                .data(json.features)
                .enter()
                .append("path")
                .attr("d", path)
                .style("fill", d => d.properties.unemployed ? color(d.properties.unemployed) : "#ccc");

            d3.csv("VIC_city.csv", function (d) {
                return { place: d.place, lat: +d.lat, lon: +d.lon };
            }).then(function (data) {
                cityLayer.selectAll("circle")
                    .data(data)
                    .enter()
                    .append("circle")
                    .attr("cx", d => projection([d.lon, d.lat])[0])
                    .attr("cy", d => projection([d.lon, d.lat])[1])
                    .attr("r", 4)
                    .style("fill", "red")
                    .on("mouseover", function (event, d) {
                        // Add a text element under the circle
                        cityLayer.append("text")
                            .attr("x", projection([d.lon, d.lat])[0])
                            .attr("y", projection([d.lon, d.lat])[1] + 12)  
                            .attr("text-anchor", "middle")  
                            .attr("class", "city-label")
                            .style("font-size", "10px")
                            .style("fill", "black")
                            .text(d.place);
                    })
                    .on("mouseout", function () {
                        // Remove the text when mouse leaves the circle
                        cityLayer.selectAll(".city-label").remove();
                    });
            });
        });
    });
}

window.onload = init;
