try {
    /* ***************************************************
     *
     * CREATE HELPER RAPHAEL OBJECTS
     *
     * *************************************************** */

    // Initiate a new Raphael canvas
    var colors = Katan.getColors();
    var pr = new Raphael('legend-road', 50, 45);
    var kr = new Katan(pr);
    var cr = kr.getPaper();

    var pk = new Raphael('legend-knight', 50, 45);
    var kk = new Katan(pk);
    var ck = kk.getPaper();

    var ps = new Raphael('legend-settlement', 50, 45);
    var ks = new Katan(ps);
    var cs = ks.getPaper();

    var pc = new Raphael('legend-city', 50, 45);
    var kc = new Katan(pc);
    var cc = kc.getPaper();

    /* ***************************************************
     *
     * CREATE GAME MAP RESOURCE TILES
     *
     * *************************************************** */

    // Road
    var legendRoad = new Katan.Road(cr, {
        cx: 5,
        cy: 10,
        text: '',
        state: false
    });

    // Knight
    var legendKnight = new Katan.Knight(ck, {
        cx: 15,
        cy: 6,
        text: '',
        state: false
    });

    // Settlement
    var legendSettle = new Katan.Settlement(cs, {
        cx: 17,
        cy: 12,
        text: '1',
        state: false
    });
    cs.canvas.getElementsByTagName('text')[0].y.baseVal[0].value = 4;

    // City
    var legendCity = new Katan.City(cc, {
        cx: 12,
        cy: 12,
        text: '2',
        state: false
    });
    cc.canvas.getElementsByTagName('text')[0].y.baseVal[0].value = 3;

    // Wildcard
    if ($('#legend-wildcard').length > 0) {
        var paperWildcard = Raphael('legend-wildcard', 50, 45);
        paperWildcard.canvas.setAttribute('preserveAspectRatio', 'xMinYMin meet');

        var legendWild = paperWildcard.set(
            paperWildcard.circle(25, 25, 15)
        ).attr({fill: "#ecf0f1", stroke: "#2c3e50", "stroke-width": 2});
        legendWild.push(
            paperWildcard.text(34, 20, "\u2731").attr({"font-size": 18, "font-weight": 700})
        );
        legendWild.transform('s0.75');
    }
} catch (e) {
    console.log('mKatan Dice: ' + e);
}