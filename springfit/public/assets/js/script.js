var svg = d3.select("svg"),
  margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 40
  },
  width = +svg.attr("width") - margin.left - margin.right,
  height = +svg.attr("height") - margin.top - margin.bottom;

var parseTime = d3.timeParse("%Y-%m-%d");
// bisectDate = d3.bisector(function(d) { return d.Date; }).left;



var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height - (margin.top * 2), 0]);

var line = d3.line()
  .x(function (d) {return x(d.Date);})
  .y(function (d) {return y(d.Avg_Pace);});

var g = svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("assets/running_data_noduplicatedate.json", function (error, data) {
  if (error) throw error;
  // console.log(data);


  data.forEach(function (d) {
    d.Avg_Pace = +d.Avg_Pace;
    d.Date = parseTime(d.Date);
  });
  console.log(data[0]);


  x.domain(d3.extent(data, function (d) {
    return d.Date;
  }));
  

  y.domain([
    (Math.floor(d3.min(data, function (d) {
      return d.Avg_Pace;
    }) / 10) * 10),
    (Math.ceil(d3.max(data, function (d) {
      return d.Avg_Pace;
    }) / 10) * 10)
  ]);

  // x axis label
  g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + (height - margin.bottom) + ")")
    .call(d3.axisBottom(x))
    .append('text')
    .attr("class", "axis-tspan")
    .attr("x", 0)
    .attr("y", 0)
    .attr("dx", "3.1em")
    .text("Time");

  // y axis label
  g.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y).ticks(6))
    .append("text")
    .attr("class", "axis-title")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .text("Avg Pace (seconds)");


  // Data line
  g.append("path")
      .datum(data)
      .attr("class", "data-line")
      .attr("d", line)
      .on("mouseover", function(d) {
        console.log(d);
        


        var xPosition = parseFloat(d3.select(this).attr("x"));
        var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + height / 2;
        d3.select("#tooltip").classed("hidden", false);
        
        d3.select("#tooltip")
          // .style("left", xPosition + "px")
          // .style("top", yPosition + "px")
          .style("left","5px")
          .style("top","5px")
          .style("cursor", "pointer")
          .select("#value")
          .text(d);

       })
       .on("mouseout", function() {


        d3.select("#tooltip").classed("hidden", true);

       })


});