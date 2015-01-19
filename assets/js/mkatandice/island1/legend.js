// New road canvas
var paperRoad = Raphael('legend-road', 50, 45);
paperRoad.canvas.setAttribute('preserveAspectRatio', 'xMidYMid meet');
var r1 = paperRoad.set(
    paperRoad.rect(5, 20, 40, 15)
).attr({fill: "#ecf0f1", stroke: "#2c3e50", "stroke-width": 2});
r1.transform('s0.75');

// New knight canvas
var paperKnight = Raphael('legend-knight', 50, 45);
paperKnight.canvas.setAttribute('preserveAspectRatio', 'xMidYMid meet');
var k1 = paperKnight.set(
    paperKnight.ellipse(25, 30, 10, 18),
    paperKnight.circle(25, 15, 10)
).attr({fill: "#ecf0f1", stroke: "#2c3e50", "stroke-width": 2});
k1.transform('s0.75');

// New settlement canvas
var paperSettlement = Raphael('legend-settlement', 50, 45);
paperSettlement.canvas.setAttribute('preserveAspectRatio', 'xMidYMid meet');
var settlement = "M15,20 L25,10 L35,20 L35,40 L15,40z";
var s1 = paperSettlement.path(settlement)
    .attr({fill: "#ecf0f1", stroke: "#2c3e50", "stroke-width": 2});
s1.transform('s0.75');

// New city canvas
var paperCity = Raphael('legend-city', 50, 45);
paperCity.canvas.setAttribute('preserveAspectRatio', 'xMidYMid meet');
var city = "M20,20 L30,10 L40,20 L40,40 L10,40 L10,20z";
var c1 = paperCity.path(city)
    .attr({fill: "#ecf0f1", stroke: "#2c3e50", "stroke-width": 2});
c1.transform('s0.75');

// New road canvas
var paperWildcard = Raphael('legend-wildcard', 50, 45);
paperWildcard.canvas.setAttribute('preserveAspectRatio', 'xMidYMid meet');
var w1 = paperWildcard.set(
    paperWildcard.circle(25, 25, 15)
).attr({fill: "#ecf0f1", stroke: "#2c3e50", "stroke-width": 2});
w1.push(
    paperWildcard.text(34, 20, "\u2731").attr({"font-size": 18, "font-weight": 700})
);
w1.transform('s0.75');