/* ***************************************************
 *
 * CREATE HELPER RAPHAEL OBJECTS
 *
 * *************************************************** */

// Initiate a new Raphael canvas
var colors = Katan.getColors();
var kr = new Katan('legend-road', 50, 45);
var cr = kr.getCanvas();

var kk = new Katan('legend-knight', 50, 45);
var ck = kk.getCanvas();

var ks = new Katan('legend-settlement', 50, 45);
var cs = ks.getCanvas();

var kc = new Katan('legend-city', 50, 45);
var cc = kc.getCanvas();

var paperWildcard = Raphael('legend-wildcard', 50, 45);
paperWildcard.canvas.setAttribute('preserveAspectRatio', 'xMidYMid meet');

/* ***************************************************
 *
 * CREATE GAME MAP RESOURCE TILES
 *
 * *************************************************** */

// Road
var r1  = new Katan.Road(cr, {
    cx: 5,
    cy: 10,
    text: '',
    state: false
});

// Knight
var k1  = new Katan.Knight(ck, {
    cx: 15,
    cy: 6,
    text: '',
    state: false
});

// Settlement
var s1  = new Katan.Settlement(cs, {
    cx: 17,
    cy: 12,
    text: '',
    state: false
});

// City
var c1  = new Katan.City(cc, {
    cx: 12,
    cy: 12,
    text: '',
    state: false
});

// New road canvas
var w1 = paperWildcard.set(
    paperWildcard.circle(25, 25, 15)
).attr({fill: "#ecf0f1", stroke: "#2c3e50", "stroke-width": 2});
w1.push(
    paperWildcard.text(34, 20, "\u2731").attr({"font-size": 18, "font-weight": 700})
);
w1.transform('s0.75');