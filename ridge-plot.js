import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const containerId = "ridge-plot";
let launchSeries = [];
let topCountries = [];

d3.csv("topthree.csv").then(rawData => {
  // Parse using correct column names
  launchSeries = rawData.map(d => ({
    year: +d.Year,
    country: d.Entity,
    launches: +d["Annual number of objects launched into outer space"]
  }));

  // Derive top 3 countries by total launches
  const totals = d3.rollups(
    launchSeries,
    v => d3.sum(v, d => d.launches),
    d => d.country
  ).sort((a, b) => d3.descending(a[1], b[1]));

  topCountries = totals.slice(0, 3).map(d => d[0]);

  drawRidgePlot();
}).catch(err => console.error("CSV load error:", err));

function drawRidgePlot() {
  const container = d3.select(`#${containerId}`);
  container.selectAll('*').remove();

  const margin = { top: 90, right: 30, bottom: 30, left: 300 };
  const width = 1960 - margin.left - margin.right;
  const height = 500;
  const rowHeight = height / topCountries.length;

  const svg = container.append("svg")
    .attr("width", "100%")
    .attr("height", "20%")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);


  const x = d3.scaleLinear()
    .domain(d3.extent(launchSeries, d => d.year))
    .range([0, width]);

  const y = d3.scaleLinear()
    .domain([0, d3.max(launchSeries, d => d.launches)])
    .range([rowHeight, 0]);

  const color = d3.scaleOrdinal(d3.schemeSet2).domain(topCountries);

  const area = d3.area()
    .x(d => x(d.year))
    .y0(rowHeight)
    .y1(d => y(d.launches))
    .curve(d3.curveBasis);

  topCountries.forEach((country, i) => {
    const countryData = launchSeries
      .filter(d => d.country === country)
      .sort((a, b) => a.year - b.year);

    const group = svg.append("g")
      .attr("transform", `translate(0, ${i * rowHeight})`);

    group.append("path")
      .datum(countryData)
      .attr("fill", color(country))
      .attr("opacity", 0.8)
      .attr("d", area);

    group.append("text")
      .attr("x", -10)
      .attr("y", 150)
      .attr("text-anchor", "end")
      .attr("fill", "white")
      .attr("font-weight", "bold")
      .attr("font-size", "30px")
      .text(country);
  });

  svg.append("g")
    .attr("transform", `translate(0,${topCountries.length * rowHeight})`)
    .call(d3.axisBottom(x).tickFormat(d3.format("d")));

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", -30)
    .attr("text-anchor", "middle")
    .attr("font-size", "40px")
    .attr("font-weight", "bold")
    .attr("fill", "white")
    .text("Ridge Plot of Annual Launches of Top 3 Countries");
}
