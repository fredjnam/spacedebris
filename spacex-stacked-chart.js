import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const containerId = "spacex-stacked-chart";

d3.csv("spacex_estimated_launches.csv").then(data => {
  const keys = data.columns.slice(1); // skip "Year"

  // Convert all values to numbers
  data.forEach(d => {
    d.Year = +d.Year;
    keys.forEach(k => d[k] = +d[k]);
  });

  // Stack data
  const stack = d3.stack().keys(keys);
  const stackedData = stack(data);

  // Set dimensions
  const margin = { top: 60, right: 100, bottom: 40, left: 60 };
  const width = 760 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  // Create SVG container
  const svg = d3.select(`#${containerId}`)
    .append("svg")
    .attr("width", "100%")
    .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // X and Y scales
  const x = d3.scaleBand()
    .domain(data.map(d => d.Year))
    .range([0, width])
    .padding(0.2);

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d3.sum(keys, k => d[k]))])
    .nice()
    .range([height, 0]);

  // Color scale
  const color = d3.scaleOrdinal()
    .domain(keys)
    .range([
      "#b0c4de", // Falcon 9 v1.0
      "#4169e1", // Falcon 9 v1.1
      "#0000cd", // Falcon 9 Full Thrust
      "#6495ed", // Falcon 9 FT (reused)
      "#2e8b57", // Falcon 9 Block 5
      "#66cdaa", // Falcon 9 Block 5 (reused)
      "#ffd700"  // Falcon Heavy
    ]);

  // Draw stacked bars
  svg.selectAll("g.layer")
    .data(stackedData)
    .join("g")
    .attr("fill", d => color(d.key))
    .selectAll("rect")
    .data(d => d)
    .join("rect")
    .attr("x", d => x(d.data.Year))
    .attr("y", d => y(d[1]))
    .attr("height", d => y(d[0]) - y(d[1]))
    .attr("width", x.bandwidth());

  // X-axis
  svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x).tickFormat(d3.format("d")));

  // Y-axis
  svg.append("g").call(d3.axisLeft(y));

  // Title
  svg.append("text")
    .attr("x", width / 2)
    .attr("y", -20)
    .attr("text-anchor", "middle")
    .attr("fill", "white")
    .attr("font-size", "1.2rem")
    .attr("font-weight", "bold")
    .text("Rocket Configurations Used by SpaceX");

  // Legend
  const legend = svg.append("g")
    .attr("transform", `translate(${width + 20}, 0)`);

  keys.forEach((key, i) => {
    const g = legend.append("g").attr("transform", `translate(0, ${i * 20})`);
    g.append("rect")
      .attr("width", 16)
      .attr("height", 16)
      .attr("fill", color(key));
    g.append("text")
      .attr("x", 20)
      .attr("y", 12)
      .text(key)
      .style("font-size", "0.8rem")
      .attr("fill", "white");
  });
}).catch(error => {
  console.error("❌ Error loading CSV:", error);
});

const wrapper = document.getElementById("spacex-stacked-wrapper");
const observer = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    wrapper.classList.add("genie-in");
    observer.disconnect();
  }
}, { threshold: 0.5 });

observer.observe(wrapper);

  