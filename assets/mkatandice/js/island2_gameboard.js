try {
    /* ***************************************************
     *
     * CREATE HELPER RAPHAEL OBJECTS
     *
     * *************************************************** */

    // Initiate a new Raphael canvas
    var k = new Katan('map2-svg', 325, 335);
    var c = k.getCanvas();
    var colors = Katan.getColors();

    /* ***************************************************
     *
     * CREATE GAME MAP RESOURCE TILES
     *
     * *************************************************** */

    var oreTile = new Katan.HexTile(c, {
        cx           : 0,
        cy           : 62,
        fill         : colors.wetasphalt,
        innerCircle  : true,
        textFill     : colors.wetasphalt,
        resourceIcon : 'ore',
        state        : true,
        stateFill    : colors.wetasphalt,
    });
    var grainTile = new Katan.HexTile(c, {
        cx           : 0,
        cy           : 166,
        fill         : colors.sunflower,
        innerCircle  : true,
        textFill     : colors.sunflower,
        resourceIcon : 'grain',
        state        : true,
        stateFill    : colors.sunflower,
    });
    var woolTile = new Katan.HexTile(c, {
        cx           : 90,
        cy           : 218,
        fill         : colors.turquoise,
        innerCircle  : true,
        textFill     : colors.turquoise,
        resourceIcon : 'wool',
        state        : true,
        stateFill    : colors.turquoise,
    });
    var lumberTile = new Katan.HexTile(c, {
        cx           : 180,
        cy           : 166,
        fill         : colors.nephritis,
        innerCircle  : true,
        textFill     : colors.nephritis,
        resourceIcon : 'lumber',
        state        : true,
        stateFill    : colors.nephritis,
    });
    var brickTile = new Katan.HexTile(c, {
        cx           : 180,
        cy           : 62,
        fill         : colors.alizarin,
        innerCircle  : true,
        textFill     : colors.alizarin,
        resourceIcon : 'brick',
        state        : true,
        stateFill    : colors.alizarin,
    });
    var desertTile1 = new Katan.HexTile(c, {
        cx           : 90,
        cy           : 10,
        fill         : colors.concrete,
        innerCircle  : true,
        textFill     : colors.concrete,
        resourceIcon : 'desert',
        state        : false
    });
    var desertTile2 = new Katan.HexTile(c, {
        cx           : 90,
        cy           : 114,
        fill         : colors.concrete,
        innerCircle  : true,
        textFill     : colors.concrete,
        resourceIcon : 'desert',
        state        : false
    });

    /* ***************************************************
     *
     * CREATE GAME MAP ROADS
     *
     * *************************************************** */

    var r0  = new Katan.Road(c, {
        cx: 45,
        cy: 40,
        fill: colors.amethyst,
        stroke: colors.midnightblue,
        textFill: colors.clouds,
        rotate: [60],
        text: '\u279E'
    });
    var r1  = new Katan.Road(c, {
        cx: 45,
        cy: 67,
        text: '',
        state: true,
        rotate: [300]
    });
    var r2  = new Katan.Road(c, {
        cx: 25,
        cy: 79,
        text: '',
        state: true,
        rotate: [0]
    });
    var r3  = new Katan.Road(c, {
        cx: 45,
        cy: 91,
        text: '',
        state: true,
        rotate: [60]
    });
    var r4  = new Katan.Road(c, {
        cx: 45,
        cy: 120,
        text: '',
        state: true,
        rotate: [300]
    });
    var r5  = new Katan.Road(c, {
        cx: 25,
        cy: 131,
        text: '',
        state: true,
        rotate: [0]
    });
    var r6  = new Katan.Road(c, {
        cx: 45,
        cy: 143,
        fill: colors.amethyst,
        text: '',
        state: false,
        rotate: [60]
    });
    var r7  = new Katan.Road(c, {
        cx: 70,
        cy: 157,
        text: '',
        state: true,
        rotate: [0]
    });
    var r8  = new Katan.Road(c, {
        cx: 90,
        cy: 147,
        text: '',
        state: true,
        rotate: [300]
    });
    var r9  = new Katan.Road(c, {
        cx: 115,
        cy: 131,
        text: '',
        state: true,
        rotate: [0]
    });
    var r10 = new Katan.Road(c, {
        cx: 135,
        cy: 120,
        text: '',
        state: true,
        rotate: [300]
    });
    var r11 = new Katan.Road(c, {
        cx: 135,
        cy: 90,
        text: '',
        state: true,
        rotate: [60]
    });
    var r12 = new Katan.Road(c, {
        cx: 115,
        cy: 78,
        text: '',
        state: true,
        rotate: [0]
    });
    var r13 = new Katan.Road(c, {
        cx: 135,
        cy: 67,
        text: '',
        state: true,
        rotate: [300]
    });
    var r14 = new Katan.Road(c, {
        cx: 134,
        cy: 38,
        text: '',
        state: true,
        rotate: [60]
    });
    var r15 = new Katan.Road(c, {
        cx: 115,
        cy: 27,
        text: '',
        state: true,
        rotate: [0]
    });
    var r16 = new Katan.Road(c, {
        cx: 90,
        cy: 12,
        text: '',
        state: true,
        rotate: [60]
    });
    var r17 = new Katan.Road(c, {
        cx: 70,
        cy: 2,
        text: '',
        state: true,
        rotate: [0]
    });


    /* ***************************************************
     *
     * CREATE GAME MAP KNIGHTS
     *
     * *************************************************** */

    var k1 = new Katan.Knight(c, {
        cx: 33,
        cy: 75,
        text: '',
        state: true
    });
    var k2 = new Katan.Knight(c, {
        cx: 33,
        cy: 178,
        text: '',
        state: true
    });
    var k3 = new Katan.Knight(c, {
        cx: 123,
        cy: 230,
        text: '',
        state: true
    });
    var k4 = new Katan.Knight(c, {
        cx: 213,
        cy: 178,
        text: '',
        state: true
    });
    var k5 = new Katan.Knight(c, {
        cx: 213,
        cy: 75,
        text: '',
        state: true
    });
    var k6 = new Katan.Knight(c, {
        cx: 123,
        cy: 24,
        text: '',
        state: true
    });
    var k7 = new Katan.Knight(c, {
        cx: 157,
        cy: 24,
        text: '',
        state: true
    });
    var k8 = new Katan.Knight(c, {
        cx: 123,
        cy: 128,
        text: '',
        state: true
    });
    var k9 = new Katan.Knight(c, {
        cx: 157,
        cy: 128,
        text: '',
        state: true
    });


    /* ***************************************************
     *
     * CREATE GAME MAP SETTLEMENTS
     *
     * *************************************************** */

    var s1 = new Katan.Settlement(c, {
        cx: 114,
        cy: 100,
        text: '',
        state: true
    });
    var s2 = new Katan.Settlement(c, {
        cx: 114,
        cy: 204,
        text: '',
        state: true
    });
    var s3 = new Katan.Settlement(c, {
        cx: 114,
        cy: 310,
        text: '',
        state: true
    });
    var s4 = new Katan.Settlement(c, {
        cx: 290,
        cy: 204,
        text: '',
        state: true
    });
    var s5 = new Katan.Settlement(c, {
        cx: 290,
        cy: 98,
        text: '',
        state: true
    });
    var s6 = new Katan.Settlement(c, {
        cx: 204,
        cy: 45,
        text: '',
        state: true
    });
    var s7 = new Katan.Settlement(c, {
        cx: 114,
        cy: 1,
        text: '',
        state: true
    });


    /* ***************************************************
     *
     * CREATE GAME MAP CITIES
     *
     * *************************************************** */

    var c1 = new Katan.City(c, {
        cx: 15,
        cy: 151,
        text: '',
        state: true
    });
    var c2 = new Katan.City(c, {
        cx: 15,
        cy: 255,
        text: '',
        state: true
    });
    var c3 = new Katan.City(c, {
        cx: 198,
        cy: 255,
        text: '',
        state: true
    });
    var c4 = new Katan.City(c, {
        cx: 198,
        cy: 149,
        text: '',
        state: true
    });
} catch (e) {
    console.log('mKatan Dice: ' + e);
}