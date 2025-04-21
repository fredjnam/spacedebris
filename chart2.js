// chart 2


document.addEventListener("DOMContentLoaded", () => {

    // launch data shown in red
    const redData = [
        { Year: 1957, Count: 3 },
        { Year: 1958, Count: 28 },
        { Year: 1959, Count: 23 },
        { Year: 1960, Count: 38 },
        { Year: 1961, Count: 50 },
        { Year: 1962, Count: 81 },
        { Year: 1963, Count: 70 },
        { Year: 1964, Count: 101},
        { Year: 1965, Count: 124},
        { Year: 1966, Count: 131 },
        { Year: 1967, Count: 172 },
        { Year: 1968, Count: 128 },
        { Year: 1969, Count: 125 },
        { Year: 1970, Count: 134 },
        { Year: 1971, Count: 133 },
        { Year: 1972, Count: 113 },
        { Year: 1973, Count: 116 },
        { Year: 1974, Count: 113 },
        { Year: 1975, Count: 132 },
        { Year: 1976, Count: 131 },
        { Year: 1977, Count: 130 },
        { Year: 1978, Count: 128 },
        { Year: 1979, Count: 110 },
        { Year: 1980, Count: 108 },
        { Year: 1981, Count: 126 },
        { Year: 1982, Count: 129 },
        { Year: 1983, Count: 129 },
        { Year: 1984, Count: 129 },
        { Year: 1985, Count: 125 },
        { Year: 1986, Count: 110 },
        { Year: 1987, Count: 114 },
        { Year: 1988, Count: 121 },
        { Year: 1989, Count: 102 },
        { Year: 1990, Count: 121 },
        { Year: 1991, Count: 91 },
        { Year: 1992, Count: 97 },
        { Year: 1993, Count: 83 },
        { Year: 1994, Count: 93 },
        { Year: 1995, Count: 80 },
        { Year: 1996, Count: 77 },
        { Year: 1997, Count: 89 },
        { Year: 1998, Count: 82 },
        { Year: 1999, Count: 78 },
        { Year: 2000, Count: 85 },
        { Year: 2001, Count: 59 },
        { Year: 2002, Count: 65 },
        { Year: 2003, Count: 63 },
        { Year: 2004, Count: 55 },
        { Year: 2005, Count: 56 },
        { Year: 2006, Count: 66 },
        { Year: 2007, Count: 68 },
        { Year: 2008, Count: 69 },
        { Year: 2009, Count: 78 },
        { Year: 2010, Count: 74 },
        { Year: 2011, Count: 84 },
        { Year: 2012, Count: 78 },
        { Year: 2013, Count: 81},
        { Year: 2014, Count: 92},
        { Year: 2015, Count: 87},
        { Year: 2016, Count: 85},
        { Year: 2017, Count: 90},
        { Year: 2018, Count: 114 },
        { Year: 2019, Count: 102 },
        { Year: 2020, Count: 114},
        { Year: 2021, Count: 146},
        { Year: 2022, Count: 186},
        { Year: 2023, Count: 223},
        { Year: 2024, Count: 263},
    ];

  // culmulative debris data show in orange
  const orangeData = [
    { Year: 1957, Count:    3 }, { Year: 1958, Count:   13 },
    { Year: 1959, Count:   30 }, { Year: 1960, Count:   74 },
    { Year: 1961, Count:  477 }, { Year: 1962, Count:  624 },
    { Year: 1963, Count:  828 }, { Year: 1964, Count: 1140 },
    { Year: 1965, Count: 2445 }, { Year: 1966, Count: 2841 },
    { Year: 1967, Count: 2789 }, { Year: 1968, Count: 3168 },
    { Year: 1969, Count: 3511 }, { Year: 1970, Count: 4072 },
    { Year: 1971, Count: 4467 }, { Year: 1972, Count: 4794 },
    { Year: 1973, Count: 5311 }, { Year: 1974, Count: 5478 },
    { Year: 1975, Count: 6313 }, { Year: 1976, Count: 7050 },
    { Year: 1977, Count: 7288 }, { Year: 1978, Count: 7698 },
    { Year: 1979, Count: 8054 }, { Year: 1980, Count: 8203 },
    { Year: 1981, Count: 8682 }, { Year: 1982, Count:10814 },
    { Year: 1983, Count:11126 }, { Year: 1984, Count:11355 },
    { Year: 1985, Count:11546 }, { Year: 1986, Count:12407 },
    { Year: 1987, Count:12972 }, { Year: 1988, Count:13147 },
    { Year: 1989, Count:13162 }, { Year: 1990, Count:12782 },
    { Year: 1991, Count:13039 }, { Year: 1992, Count:13233 },
    { Year: 1993, Count:15053 }, { Year: 1994, Count:16132 },
    { Year: 1995, Count:16479 }, { Year: 1996, Count:16556 },
    { Year: 1997, Count:17336 }, { Year: 1998, Count:17794 },
    { Year: 1999, Count:21695 }, { Year: 2000, Count:21991 },
    { Year: 2001, Count:22170 }, { Year: 2002, Count:22154 },
    { Year: 2003, Count:21888 }, { Year: 2004, Count:21800 },
    { Year: 2005, Count:21795 }, { Year: 2006, Count:22750 },
    { Year: 2007, Count:22832 }, { Year: 2008, Count:23052 },
    { Year: 2009, Count:22692 }, { Year: 2010, Count:22799 },
    { Year: 2011, Count:23081 }, { Year: 2012, Count:23052 },
    { Year: 2013, Count:23009 }, { Year: 2014, Count:23094 },
    { Year: 2015, Count:22748 }, { Year: 2016, Count:22604 },
    { Year: 2017, Count:22860 }, { Year: 2018, Count:23519 },
    { Year: 2019, Count:24151 }, { Year: 2020, Count:25256 },
    { Year: 2021, Count:26835 }, { Year: 2022, Count:29918 },
    { Year: 2023, Count:30479 }, { Year: 2024, Count:32048 },
    { Year: 2025, Count:30913 }
  ];


//  SVG canvas dimensions
  const margin = { top: 40, right: 60, bottom: 60, left: 80 },
        width  = 1000 - margin.left - margin.right,
        height = 400  - margin.top  - margin.bottom;

    
  const svg = d3.select("#chart2")
    .append("svg")
      .attr("viewBox", `0 0 ${width+margin.left+margin.right} ${height+margin.top+margin.bottom}`)
      .attr("preserveAspectRatio", "xMinYMin meet")
    .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

  // —————————————————————
  // 3) Scales & Axes
  // —————————————————————
  const x = d3.scaleLinear()
      .domain([d3.min(redData,d=>d.Year), 2025])
      .range([0, width]);

  const y = d3.scaleLinear()
      .domain([0, d3.max(redData, d=>d.Count)])
      .nice()
      .range([height, 0]);

  // X‑axis
  svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x).tickFormat(d3.format("d")));
  svg.append("text")
    .attr("class","axis-label")
    .attr("x", width/2)
    .attr("y", height + margin.bottom - 10)
    .attr("text-anchor","middle")
    .text("Year");

  // Y‑axis
  svg.append("g")
    .attr("class","y-axis")
    .call(d3.axisLeft(y));
  svg.append("text")
    .attr("class","axis-label")
    .attr("transform","rotate(-90)")
    .attr("x",-height/2)
    .attr("y",-margin.left+30)
    .attr("text-anchor","middle")
    .text("");

  // Grid
  svg.append("g")
    .attr("class","grid")
    .call(d3.axisLeft(y).tickSize(-width).tickFormat(""))
    .selectAll("line").attr("stroke","#eeeeee");

  // Title
  svg.append("text")
    .attr("class","chart-title")
    .attr("y",-margin.top/2)
    .attr("text-anchor","start")
    .text("Annual Space Launches + Actively Tracked Debris: 1957–2024");

  // —————————————————————
  // 4) Draw original red line (STATIC)
  // —————————————————————
  const redLine = d3.line()
    .x(d => x(d.Year))
    .y(d => y(d.Count));

  // <— store this in a variable so we can re‑draw it later
  const redPath = svg.append("path")
    .datum(redData)
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("stroke-width", 3)
    .attr("d", redLine);

  // —————————————————————
  // 5) Prepare giant orange line
  // —————————————————————
  const orangeLine = d3.line()
    .x(d => x(d.Year))
    .y(d => y(d.Count));

  const orangePath = svg.append("path")
    .datum(orangeData)
    .attr("fill", "none")
    .attr("stroke", "orange")
    .attr("stroke-width", 3)
    .attr("stroke-linecap","round")
    .attr("stroke-linejoin","round")
    .attr("d", orangeLine);

  const totalLen = orangePath.node().getTotalLength();
  orangePath
    .attr("stroke-dasharray", `${totalLen} ${totalLen}`)
    .attr("stroke-dashoffset", totalLen);

    // 7) LEGEND
const legendData = [
    { color: "red",    label: "Annual Launches"  },
    { color: "orange", label: "Cumulative Debris" }
  ];
  
  const legend = svg.append("g")
    .attr("class", "legend")
    // move it to top‑right corner:
    .attr("transform", `translate(${width - 160},${-margin.top/2})`);
  
  const itemHeight = 20;
  legend.selectAll("g")
    .data(legendData)
    .join("g")
      .attr("transform", (d,i) => `translate(0,${i * itemHeight})`)
    .call(g => {
      // color swatch
      g.append("rect")
        .attr("width", 16)
        .attr("height", 16)
        .attr("fill", d => d.color);
      // label
      g.append("text")
        .attr("x", 24)
        .attr("y", 12)
        .attr("fill", "white")
        .style("font-size", "0.9rem")
        .text(d => d.label);
    });
    
  // —————————————————————
  // 6) Scroll‑trigger & animation
  // —————————————————————
    function animateOrange() {
    const delay    = 1000;  // wait 1 second
    const duration = 10000;
    const startMax = y.domain()[1];
    const interp   = d3.interpolate(startMax, 40000);

    // 6a) axis + grid + both lines
    svg.select(".y-axis")
       .transition()
       .delay(delay)  
      .duration(duration)
      .ease(d3.easeLinear)
      .tween("rescale", () => t => {
        // 1) update domain
        y.domain([0, interp(t)]);
        // 2) redraw axis & grid
        svg.select(".y-axis")
           .call(d3.axisLeft(y));
        svg.select(".grid")
           .call(d3.axisLeft(y).tickSize(-width).tickFormat(""))
           .selectAll("line").attr("stroke","#eeeeee");
        // 3) **re‑draw both paths** at the new y‑scale
        redPath    .attr("d", redLine);
        orangePath .attr("d", orangeLine);
      });

    // 6b) draw the orange stroke itself
        orangePath.transition()
        .delay(delay)     
      .duration(duration)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0);
  }

  // IntersectionObserver
  const observer = new IntersectionObserver((entries, obs) => {
    if (entries[0].isIntersecting) {
      animateOrange();
      obs.disconnect();
    }
  }, { threshold: 0.5 });

  observer.observe(document.querySelector("#chart2"));
});