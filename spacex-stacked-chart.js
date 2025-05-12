import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const containerId = "spacex-stacked-chart";

Promise.all([
  d3.csv("spacex_estimated_launches.csv"),
  d3.csv("spacex_ratio.csv")
]).then(([barData, lineData]) => {
  const keys = barData.columns.slice(1); // Skip Year column

  // Clean and convert
  barData.forEach(d => {
    d.Year = +d.Year;
    keys.forEach(k => d[k] = +d[k]);
  });

  lineData.forEach(d => {
    d.Year = +d.Year;
    d.Ratio = +d["SpaceX Ratio"];
  });

  const ratioMap = new Map(lineData.map(d => [d.Year, d.Ratio]));

  const stack = d3.stack().keys(keys);
  const stackedData = stack(barData);

  const margin = { top: 60, right: 180, bottom: 40, left: 60 };
  const width = 720 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  const svg = d3.select(`#${containerId}`)
    .append("svg")
    .attr("width", "100%")
    .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const years = barData.map(d => d.Year);
  const x = d3.scaleBand()
    .domain(years)
    .range([0, width])
    .padding(0.2);

  const yLeft = d3.scaleLinear()
    .domain([0, d3.max(barData, d => d3.sum(keys, k => d[k]))])
    .nice()
    .range([height, 0]);

  const yRight = d3.scaleLinear()
    .domain([0, 100])
    .range([height, 0]);

  const color = d3.scaleOrdinal()
    .domain(keys)
    .range(["#b0c4de", "#4169e1", "#0000cd", "#6495ed", "#2e8b57", "#66cdaa", "#ffd700"]);

  svg.selectAll("g.layer")
    .data(stackedData)
    .join("g")
    .attr("fill", d => color(d.key))
    .selectAll("rect")
    .data(d => d)
    .join("rect")
    .attr("x", d => x(d.data.Year))
    .attr("y", d => yLeft(d[1]))
    .attr("height", d => yLeft(d[0]) - yLeft(d[1]))
    .attr("width", x.bandwidth());

  svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x).tickFormat(d3.format("d")));

  svg.append("g").call(d3.axisLeft(yLeft));

  // X-axis label
svg.append("text")
  .attr("class", "axis-label")
  .attr("x", width / 2)
  .attr("y", height + 35)
  .attr("text-anchor", "middle")
  .text("Year");

// Left Y-axis label (stacked bar totals)
svg.append("text")
  .attr("class", "axis-label")
  .attr("transform", "rotate(-90)")
  .attr("x", -height / 2)
  .attr("y", -30)
  .attr("text-anchor", "middle")
  .text("Number of Launches");

// Right Y-axis label (SpaceX %)
svg.append("text")
  .attr("class", "axis-label")
  .attr("transform", "rotate(-90)")
  .attr("x", -height / 2)
  .attr("y", width + 40)
  .attr("text-anchor", "middle")
  .text("SpaceX Share (%)");


  svg.append("g")
    .attr("transform", `translate(${width},0)`)
    .call(d3.axisRight(yRight));

  const filteredLineData = lineData.filter(d => years.includes(d.Year));

  // Define gradient
  const defs = svg.append("defs");
  const gradient = defs.append("linearGradient")
    .attr("id", "ratioGradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "0%")
    .attr("y2", "100%");

  gradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "orange")
    .attr("stop-opacity", 0.3);

  gradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "orange")
    .attr("stop-opacity", 0);

  const area = d3.area()
    .x(d => x(d.Year) + x.bandwidth() / 2)
    .y0(yRight(0))
    .y1(d => yRight(d.Ratio))
    .curve(d3.curveMonotoneX);

  svg.append("path")
    .datum(filteredLineData)
    .attr("fill", "url(#ratioGradient)")
    .attr("d", area);

  svg.append("path")
    .datum(filteredLineData)
    .attr("fill", "none")
    .attr("stroke", "orange")
    .attr("stroke-width", 2)
    .attr("d", d3.line()
      .x(d => x(d.Year) + x.bandwidth() / 2)
      .y(d => yRight(d.Ratio))
      .curve(d3.curveMonotoneX));

  svg.selectAll("circle")
    .data(filteredLineData)
    .join("circle")
    .attr("cx", d => x(d.Year) + x.bandwidth() / 2)
    .attr("cy", d => yRight(d.Ratio))
    .attr("r", 3)
    .attr("fill", "orange");

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", -20)
    .attr("text-anchor", "middle")
    .attr("fill", "white")
    .attr("font-size", "1.2rem")
    .attr("font-weight", "bold")
    .text("Rocket Configurations and SpaceX Launch Share");

  const legend = svg.append("g").attr("transform", `translate(${width + 55}, 0)`);
  keys.forEach((key, i) => {
    const g = legend.append("g").attr("transform", `translate(0, ${i * 20})`);
    g.append("rect").attr("width", 16).attr("height", 16).attr("fill", color(key));
    g.append("text").attr("x", 20).attr("y", 12).text(key).style("font-size", "0.8rem").attr("fill", "white");
  });

  legend.append("circle")
    .attr("cx", 8)
    .attr("cy", keys.length * 20 + 8)
    .attr("r", 6)
    .attr("fill", "orange");

  legend.append("text")
    .attr("x", 20)
    .attr("y", keys.length * 20 + 12)
    .text("SpaceX Share (%)")
    .style("font-size", "0.8rem")
    .attr("fill", "white");

}).catch(error => {
  console.error("❌ Error loading CSVs:", error);
});

const wrapper = document.getElementById("spacex-stacked-wrapper");
const observer = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    wrapper.classList.add("genie-in");
    observer.disconnect();
  }
}, { threshold: 0.5 });

observer.observe(wrapper);
