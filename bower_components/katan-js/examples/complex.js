var k = new Katan('complex-example', 325, 325);
var c = k.getCanvas();
var colors = Katan.getColors();

/* ***************************************************
 *
 * CREATE GAME MAP RESOURCE TILES
 *
 * *************************************************** */

var oreTile      = new Katan.HexTile(c, {
    cx           : 0,
    cy           : 52,
    fill         : colors.wetasphalt,
    innerCircle  : true,
    textFill     : colors.wetasphalt,
    resourceIcon : 'ore',
    state        : true,
    stateFill    : colors.wetasphalt,
});
var grainTile      = new Katan.HexTile(c, {
    cx           : 0,
    cy           : 156,
    fill         : colors.sunflower,
    innerCircle  : true,
    textFill     : colors.sunflower,
    resourceIcon : 'grain',
    state        : true,
    stateFill    : colors.sunflower,
});
var woolTile      = new Katan.HexTile(c, {
    cx           : 90,
    cy           : 208,
    fill         : colors.turquoise,
    innerCircle  : true,
    textFill     : colors.turquoise,
    resourceIcon : 'wool',
    state        : true,
    stateFill    : colors.turquoise,
});
var lumberTile      = new Katan.HexTile(c, {
    cx           : 180,
    cy           : 156,
    fill         : colors.nephritis,
    innerCircle  : true,
    textFill     : colors.nephritis,
    resourceIcon : 'lumber',
    state        : true,
    stateFill    : colors.nephritis,
});
var brickTile      = new Katan.HexTile(c, {
    cx           : 180,
    cy           : 52,
    fill         : colors.alizarin,
    innerCircle  : true,
    textFill     : colors.alizarin,
    resourceIcon : 'brick',
    state        : true,
    stateFill    : colors.alizarin,
});
var desertTile      = new Katan.HexTile(c, {
    cx           : 90,
    cy           : 0,
    fill         : colors.concrete,
    innerCircle  : true,
    textFill     : colors.concrete,
    resourceIcon : 'desert',
    state        : true,
    stateFill    : colors.concrete,
});

/* ***************************************************
 *
 * CREATE GAME MAP ROADS
 *
 * *************************************************** */

var r0  = new Katan.Road(c, {
    cx:45,
    cy: 35,
    fill: colors.amethyst,
    stroke: colors.midnightblue,
    textFill: colors.clouds,
    rotate: [60],
    text: '\u279E'
});
var r1  = new Katan.Road(c, {
    cx:45,
    cy: 62,
    state: true,
    rotate: [300]
});
var r2  = new Katan.Road(c, {
    cx:25,
    cy: 74,
    state: true,
    rotate: [0]
});
var r3  = new Katan.Road(c, {
    cx:45,
    cy: 86,
    state: true,
    rotate: [60]
});
var r4  = new Katan.Road(c, {
    cx:45,
    cy: 115,
    state: true,
    rotate: [300]
});
var r5  = new Katan.Road(c, {
    cx:25,
    cy: 126,
    state: true,
    rotate: [0]
});
var r6  = new Katan.Road(c, {
    cx:45,
    cy: 138,
    state: true,
    rotate: [60]
});
var r7  = new Katan.Road(c, {
    cx:70,
    cy: 152,
    state: true,
    rotate: [0]
});
var r8  = new Katan.Road(c, {
    cx:90,
    cy: 142,
    state: true,
    rotate: [300]
});
var r9  = new Katan.Road(c, {
    cx:115,
    cy: 126,
    state: true,
    rotate: [0]
});
var r10 = new Katan.Road(c, {
    cx:135,
    cy: 115,
    state: true,
    rotate: [300]
});
var r11 = new Katan.Road(c, {
    cx:135,
    cy: 85,
    state: true,
    rotate: [60]
});
var r12 = new Katan.Road(c, {
    cx:135,
    cy: 62,
    state: true,
    rotate: [300]
});
var r13 = new Katan.Road(c, {
    cx:90,
    cy: 112,
    state: true,
    rotate: [60]
});
var r14 = new Katan.Road(c, {
    cx:90,
    cy: 87,
    state: true,
    rotate: [300]
});
var r15 = new Katan.Road(c, {
    cx:90,
    cy: 59,
    state: true,
    rotate: [60]
});
var r16 = new Katan.Road(c, {
    cx:90,
    cy: 37,
    state: true,
    rotate: [300]
});


/* ***************************************************
 *
 * CREATE GAME MAP KNIGHTS
 *
 * *************************************************** */

var k1 = new Katan.Knight(c, {
    cx: 33,
    cy: 65,
    text: '1',
    state: true
});
var k2 = new Katan.Knight(c, {
    cx: 33,
    cy: 168,
    text: '2',
    state: true
});
var k3 = new Katan.Knight(c, {
    cx: 123,
    cy: 220,
    text: '3',
    state: true
});
var k4 = new Katan.Knight(c, {
    cx: 213,
    cy: 168,
    text: '4',
    state: true
});
var k5 = new Katan.Knight(c, {
    cx: 213,
    cy: 65,
    text: '5',
    state: true
});
var k6 = new Katan.Knight(c, {
    cx: 123,
    cy: 13,
    text: '6',
    state: true
});


/* ***************************************************
 *
 * CREATE GAME MAP SETTLEMENTS
 *
 * *************************************************** */

var s1 = new Katan.Settlement(c, {
    cx: 114,
    cy: 90,
    text: '3',
    state: true
});
var s2 = new Katan.Settlement(c, {
    cx: 114,
    cy: 194,
    text: '4',
    state: true
});
var s3 = new Katan.Settlement(c, {
    cx: 114,
    cy: 300,
    text: '5',
    state: true
});
var s4 = new Katan.Settlement(c, {
    cx: 204,
    cy: 248,
    text: '7',
    state: true
});
var s5 = new Katan.Settlement(c, {
    cx: 204,
    cy: 140,
    text: '9',
    state: true
});
var s6 = new Katan.Settlement(c, {
    cx: 204,
    cy: 35,
    text: '11',
    state: true
});


/* ***************************************************
 *
 * CREATE GAME MAP CITIES
 *
 * *************************************************** */

var c1 = new Katan.City(c, {
    cx: 15,
    cy: 141,
    text: '7',
    state: true
});
var c2 = new Katan.City(c, {
    cx: 15,
    cy: 245,
    text: '12',
    state: true
});
var c3 = new Katan.City(c, {
    cx: 290,
    cy: 192,
    text: '20',
    state: true
});
var c4 = new Katan.City(c, {
    cx: 290,
    cy: 86,
    text: '30',
    state: true
});