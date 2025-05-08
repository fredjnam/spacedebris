import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const data = [
  { country: "USA", launches: 42 },
  { country: "China", launches: 23 },
  { country: "Others", launches: 17 }
];

const width = 400;
const height = 400;
const margin = 40;
const radius = Math.min(width, height) / 2 - margin;

const svg = d3.select("#launch-pie-chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", `translate(${width / 2}, ${height / 2})`);

const color = d3.scaleOrdinal()
  .domain(data.map(d => d.country))
  .range(["#ff6f61", "#4dc9f6", "#ffc93c"]);

const pie = d3.pie()
  .value(d => d.launches);

const arc = d3.arc()
  .innerRadius(10) // Donut size
  .outerRadius(radius);

svg.selectAll("path")
  .data(pie(data))
  .join("path")
  .attr("d", arc)
  .attr("fill", d => color(d.data.country))
  .attr("stroke", "#1e1e1e")
  .style("stroke-width", "2px");

svg.selectAll("text")
  .data(pie(data))
  .join("text")
  .text(d => `${d.data.country} (${d.data.launches})`)
  .attr("transform", d => `translate(${arc.centroid(d)})`)
  .style("text-anchor", "middle")
  .style("font-size", "0.9rem")
  .style("fill", "white");
