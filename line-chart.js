// line-chart.js
// D3 module: render and scroll‑triggered animate launches by country line chart with stroke‑dash reveal
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const containerId = "line-chart";
let launchSeries = [];
let selectedCountries = [];

// Load CSV and initialize
// CSV columns: Year, Entity, Annual number of objects launched into outer space
d3.csv("all_launches_ever.csv").then(rawData => {
  launchSeries = rawData.map(d => ({
    year:     +d.Year,
    country:  d.Entity,
    launches: +d["Annual number of objects launched into outer space"]
  }));

  // Compute top 10 countries by total launches
  const totals = d3.rollups(
    launchSeries,
    v => d3.sum(v, d => d.launches),
    d => d.country
  ).sort((a, b) => d3.descending(a[1], b[1]));
  selectedCountries = totals.slice(0, 10).map(d => d[0]);

  drawChart();
}).catch(err => console.error("Error loading CSV:", err));

function drawChart() {
  const container = d3.select(`#${containerId}`);
  container.selectAll('*').remove();

  // Dimensions
  const totalWidth = 2000;
  const totalHeight = 600;
  const margin = { top: 40, right: 60, bottom: 60, left: 80 };
  const width  = totalWidth  - margin.left - margin.right;
  const height = totalHeight - margin.top  - margin.bottom;

  // Create SVG
  const svg = container.append('svg')
    .attr('viewBox', `0 0 ${totalWidth} ${totalHeight}`)
    .attr('preserveAspectRatio', 'xMinYMin meet')
    .style('width', '100%')
    .style('height', `${totalHeight}px`)
    .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

  // Scales
  const x = d3.scaleLinear()
    .domain(d3.extent(launchSeries, d => d.year))
    .range([0, width]);

  const y = d3.scaleLinear()
    .domain([0, d3.max(launchSeries, d => d.launches)])
    .nice()
    .range([height, 0]);

  const color = d3.scaleOrdinal()
    .domain(selectedCountries)
    .range(d3.schemeTableau10);

  // X-axis
  svg.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x).tickFormat(d3.format('d')))
    .append('text')
      .attr('x', width / 2)
      .attr('y', margin.bottom - 10)
      .attr('fill', 'white')
      .attr('text-anchor', 'middle')
      .text('Year');

  // Y-axis + gridlines
  svg.append('g')
    .call(d3.axisLeft(y))
    .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', -margin.left + 20)
      .attr('fill', 'white')
      .attr('text-anchor', 'middle')
      .text('Annual launches');

  svg.append('g')
    .call(d3.axisLeft(y).tickSize(-width).tickFormat(''))
    .selectAll('line')
      .attr('stroke', '#fff')
      .attr('stroke-opacity', 0.3);

  // Draw lines with initial stroke-dash
  const paths = selectedCountries.map(country => {
    const data = launchSeries
      .filter(d => d.country === country)
      .sort((a, b) => a.year - b.year);
    const path = svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', color(country))
      .attr('stroke-width', 2)
      .attr('d', d3.line()
        .x(d => x(d.year))
        .y(d => y(d.launches))
      );

    const totalLength = path.node().getTotalLength();
    path.attr('stroke-dasharray', `${totalLength} ${totalLength}`)
        .attr('stroke-dashoffset', totalLength);
    return path;
  });

  // Legend
  const legend = svg.append('g')
    .attr('transform', `translate(${width - 200}, 10)`);
  selectedCountries.forEach((country, i) => {
    const g = legend.append('g').attr('transform', `translate(0,${i * 20})`);
    g.append('rect').attr('width', 16).attr('height', 16).attr('fill', color(country));
    g.append('text').attr('x', 20).attr('y', 12).attr('fill', 'white').text(country);
  });

  // Scroll-triggered stroke-dash animation
  const observer = new IntersectionObserver((entries, obs) => {
    if (entries[0].isIntersecting) {
      paths.forEach(path => {
        path.transition()
          .duration(4000)
          .ease(d3.easeLinear)
          .attr('stroke-dashoffset', 0);
      });
      obs.disconnect();
    }
  }, { threshold: 0.5 });
  observer.observe(container.node());
}
