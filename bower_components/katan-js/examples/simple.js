var k = new Katan('simple-example', 325, 325);
var c = k.getCanvas();
var colors = Katan.getColors();

var oceantile = new Katan.HexTile(c);

var graintile = new Katan.HexTile(c, {
    cx: 90,
    cy: 52,
    fill: colors.sunflower,
    innerCircle: true,
    textFill: colors.sunflower,
    resourceIcon: 'grain',
    state: true,
    stateFill: colors.sunflower
});

var road = new Katan.Road(c, {
    cx: 45,
    cy: 35,
    state: true,
    rotate: [300]
});

var settlement = new Katan.Settlement(c, {
    cx: 110,
    cy: 35,
    text: '3',
    state: true
});