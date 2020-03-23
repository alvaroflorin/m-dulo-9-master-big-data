import * as d3 from "d3";
import * as topojson from "topojson-client";

const europejson  = require('./europe.json');

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", 1024)
  .attr("height", 800)
  .attr("style", "background-color: #FBFAF0");

  const aProjection = d3.geoMercator().scale(500).translate([300,900]);
  const geoPath = d3.geoPath().projection(aProjection);
  const geojson = topojson.feature(
    europejson,
    europejson.objects.continent_Europe_subunits
  );
  svg
  .selectAll("path")
  .data(geojson["features"])
  .enter()
  .append("path")
  .attr("d", geoPath).attr("class","country")  
  .on("mouseover", function(d, i) {
    d3.select(this).attr("class", "selected-country");
  })  
  .on("mouseout", function(d, i) {
    d3.select(this).attr("class", "country");
  });


