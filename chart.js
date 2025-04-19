const data = [
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
  
  const margin = { top: 40, right: 60, bottom: 60, left: 80 },
  width  = 1000 - margin.left - margin.right,
  height = 400  - margin.top  - margin.bottom;

const outerWidth  = width  + margin.left + margin.right;
const outerHeight = height + margin.top  + margin.bottom;

const svg = d3.select("#chart")
.append("svg")
.attr("viewBox", `0 0 ${outerWidth} ${outerHeight}`)
.attr("preserveAspectRatio", "xMinYMin meet")
.append("g")
.attr("transform", `translate(${margin.left},${margin.top})`);

// 1) Scales
const x = d3.scaleLinear()
.domain(d3.extent(data, d => d.Year))
.range([0, width]);

const y = d3.scaleLinear()
.domain([0, d3.max(data, d => d.Count)])
.nice()
.range([height, 0]);

// 2) X axis
svg.append("g")
.attr("transform", `translate(0,${height})`)
.call(d3.axisBottom(x).tickFormat(d3.format("d")));

// — X‑axis label
svg.append("text")
.attr("class", "x axis-label")
.attr("text-anchor", "middle")
.attr("x", width / 2)
.attr("y", height + margin.bottom - 10)
.style("font-size", ".8rem")
.attr("fill", "orange")
.text("Year");

// 3) Y axis
svg.append("g")
.call(d3.axisLeft(y));

// — Y‑axis label
svg.append("text")
.attr("class", "y axis-label")
.attr("text-anchor", "middle")
.attr("transform", "rotate(-90)")
.attr("x", -height / 2)
.attr("y", -margin.left + 30)
.style("font-size", ".8rem")
.attr("fill", "orange")
.text("Number of Launch Attempts");

// 4) Chart title (in top margin)
svg.append("text")
.attr("class", "chart-title")
//.attr("x", width / 2)
.attr("y", -margin.top / 2)
.attr("text-anchor", "start")
.style("font-size", "1.1rem")
.attr("fill", "orange")    
.text("Annual Space Launches: 1957–2024");

// 5) Grid lines
svg.append("g")
.call(d3.axisLeft(y)
.tickSize(-width)
.tickFormat("")
)
.selectAll("line")
.attr("stroke", "#eeeeee");

// 6) Line generator + animation
const line = d3.line()
.x(d => x(d.Year))
.y(d => y(d.Count));

const path = svg.append("path")
.datum(data)
.attr("fill", "none")
.attr("stroke", "red")
.attr("stroke-width", 3)
.attr("stroke-linecap", "round")    // ← round the ends
.attr("stroke-linejoin", "round")   // ← round the corners
.attr("d", line);

const totalLength = path.node().getTotalLength();

path
.attr("stroke-dasharray", `${totalLength} ${totalLength}`)
.attr("stroke-dashoffset", totalLength)
.transition()
.duration(4000)
.ease(d3.easeLinear)
.attr("stroke-dashoffset", 0);