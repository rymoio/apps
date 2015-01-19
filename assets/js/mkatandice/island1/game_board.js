/* ***************************************************
 *
 * CREATE HELPER RAPHAEL OBJECTS
 *
 * *************************************************** */

// Initiate a new Raphael canvas
var paper = Raphael('map-svg', 325, 325);
paper.canvas.setAttribute('preserveAspectRatio', 'xMidYMid meet');

/**
 * @param {Object} a paper object
 * @param {Int} x coordinate for transform
 * @param {Int} y coordinate for transform
 * @param {String} a hex color code
 * @param {String} a resource name
 * @return {Object} hexagon set object
 */
function HexTile(p, x, y, c, rs) {
    this.p  = p;
    this.x  = x;
    this.y  = y;
    this.c  = c;
    this.rs = rs;

    var coords = 'M0,52 L30,0 L90,0 L120,52 L90,104 L30,104z';
    var fontCode = {
        'brick': '\ue000',
        'ore': '\ue003',
        'wool': '\ue004',
        'lumber': '\ue005',
        'grain': '\ue006',
        'desert': '?'
    };

    var tile = p.set(
        this.p.path(coords)
    ).attr({
        'fill': this.c,
        'stroke': 'none'
    });
    tile.push(
        this.p.circle(60, 52, 16).attr({
            'fill': '#ecf0f1',
            'stroke': 'none'
        }),
        this.p.text(60, 52, fontCode[this.rs]).attr({
            'font-family': 'Resources',
            'font-size': '18',
            'fill': this.c
        })
    );
    tile.transform('T' + this.x + ',' + this.y);
    return tile;
}

/**
 * @param {Object} a paper object
 * @param {Int} x coordinate for transform
 * @param {Int} y coordinate for transform
 * @param {Int} r rotate degrees
 * @param {String} a hex color code
 * @param {String} text value
 * @return {Object} rect set object
 */
function Road(p, x, y, r, special) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.r = r;
    this.special = special || false;

    this.w = 28;
    this.h = this.w/2;

    if (this.special) {
        var road = p.set(
            this.p.rect(this.x, this.y, this.w, this.h)
        ).attr({
            'fill': '#8e44ad',
            'stroke': '#2c3e50',
            'stroke-width': 2
        });
        road.push(
            this.p.text(this.x+(this.w/2), this.y+(this.h/2), '\u279E').attr({
                'font-size': '12',
                'font-weight': '700',
                'fill': '#ecf0f1'
            })
        );
        road.transform('T' + this.x + ',' + this.y + 'r' + this.r);
    } else {
        var road = p.set(
            this.p.rect(this.x, this.y, this.w, this.h)
        ).attr({
            'fill': '#ecf0f1',
            'stroke': '#2c3e50',
            'stroke-width': 2
        }).data('state', false);
        road.push(
            this.p.text(this.x+(this.w/2), this.y+(this.h/2), '1').attr({
                'font-size': '12',
                'font-weight': '700'
            })
        );
        road.attr({'cursor': 'pointer'});
        road.transform('T' + this.x + ',' + this.y + 'r' + this.r);
        road.click(function () {
            setElementState(road);
        });
    }
    return road;
}

/**
 * @param {Object} a paper object
 * @param {Int} x coordinate for transform
 * @param {Int} y coordinate for transform
 * @param {String} text value
 * @return {Object} paper set object
 */
function Knight(p, x, y, t) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.t = t;

    var knight = p.set(
        paper.ellipse(10, 18, 8, 18),
        paper.circle(10, 7, 7)
    ).attr({
        'fill': '#ecf0f1',
        'stroke': '#2c3e50',
        'stroke-width': 2
    }).data('state', false);
    knight.push(
        this.p.text(10, 23, this.t).attr({
            'font-size': '12',
            'font-weight': '700'
        })
    );
    knight.attr({'cursor': 'pointer'});
    knight.transform('T' + this.x + ',' + this.y);
    knight.click(function () {
        setElementState(knight);
    });
    return knight;
}

/**
 * @param {Object} a paper object
 * @param {Int} x coordinate for transform
 * @param {Int} y coordinate for transform
 * @param {String} text value
 * @return {Object} rect set object
 */
function Settlement(p, x, y, t) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.t = t;

    var coords = "M0,8 L8,0 L16,8 L16,21 L0,21z";

    var settlement = p.set(
        this.p.path(coords)
    ).attr({
        'fill': '#ecf0f1',
        'stroke': '#2c3e50',
        'stroke-width': 2
    }).data('state', false);
    settlement.push(
        this.p.text(8, 13, this.t).attr({
            'font-size': '12',
            'font-weight': '700'
        })
    );
    settlement.attr({'cursor': 'pointer'});
    settlement.transform('T' + this.x + ',' + this.y);
    settlement.click(function () {
        setElementState(settlement);
    });
    return settlement;
}

/**
 * @param {Object} a paper object
 * @param {Int} x coordinate for transform
 * @param {Int} y coordinate for transform
 * @param {String} text value
 * @return {Object} rect set object
 */
function City(p, x, y, t) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.t = t;

    var coords = "M0,8 L8,8 L16,0 L24,8 L24,21 L0,21z";

    var city = p.set(
        this.p.path(coords)
    ).attr({
        'fill': '#ecf0f1',
        'stroke': '#2c3e50',
        'stroke-width': 2
    }).data('state', false);
    city.push(
        this.p.text(15, 14, this.t).attr({
            'font-size': '12',
            'font-weight': '700'
        })
    );
    city.attr({'cursor': 'pointer'});
    city.transform('T' + this.x + ',' + this.y);
    city.click(function () {
        setElementState(city);
    });
    return city;
}

/**
 * @param {Object} a paper set object
 * @return {None}
 */
function setElementState(set) {
    if (!set[0].data('state')) {
        // road has been scored
        set.forEach(function (elem) {
            if (['rect', 'circle', 'ellipse', 'path'].indexOf(elem.type) != -1) {
                // give purple fill and white stroke
                elem.attr({'fill': '#9b59b6', 'stroke': '#ecf0f1'});
            } else {
                // give white text color
                elem.attr({'fill': '#ecf0f1'});
            }
        });
        set.data('state', true);
    } else {
        // road is no longer scored
        set.forEach(function (elem) {
            if (['rect', 'circle', 'ellipse', 'path'].indexOf(elem.type) != -1) {
                // give white fill and black stroke
                elem.attr({'fill': '#ecf0f1', 'stroke': '#2c3e50'});
            } else {
                // give black text color
                elem.attr({'fill': '#2c3e50'});
            }
        });
        set.data('state', false);
    }
}

/* ***************************************************
 *
 * CREATE GAME MAP RESOURCE TILES
 *
 * *************************************************** */

var oreTile    = new HexTile(paper, 0, 52, '#34495e', 'ore');
var grainTile  = new HexTile(paper, 0, 156, '#f1c40f', 'grain');
var woolTile   = new HexTile(paper, 90, 208, '#1abc9c', 'wool');
var lumberTile = new HexTile(paper, 180, 156, '#27ae60', 'lumber');
var brickTile  = new HexTile(paper, 180, 52, '#e74c3c', 'brick');
var desertTile = new HexTile(paper, 90, 0, '#95a5a6', 'desert');


/* ***************************************************
 *
 * CREATE GAME MAP ROADS
 *
 * *************************************************** */

var r0  = new Road(paper, 45, 35, 60, true);
var r1  = new Road(paper, 45, 62, 300);
var r2  = new Road(paper, 25, 74, 0);
var r3  = new Road(paper, 45, 86, 60);
var r4  = new Road(paper, 45, 115, 300);
var r5  = new Road(paper, 25, 126, 0);
var r6  = new Road(paper, 45, 138, 60);
var r7  = new Road(paper, 70, 152, 0);
var r8  = new Road(paper, 90, 142, 300);
var r9  = new Road(paper, 115, 126, 0);
var r10 = new Road(paper, 135, 115, 300);
var r11 = new Road(paper, 135, 85, 60);
var r12 = new Road(paper, 135, 62, 300);
var r13 = new Road(paper, 90, 112, 60);
var r14 = new Road(paper, 90, 87, 300);
var r15 = new Road(paper, 90, 59, 60);
var r16 = new Road(paper, 90, 37, 300);


/* ***************************************************
 *
 * CREATE GAME MAP KNIGHTS
 *
 * *************************************************** */

var k1  = new Knight(paper, 33, 65, 1);
var k2  = new Knight(paper, 33, 168, 2);
var k3  = new Knight(paper, 123, 220, 3);
var k4  = new Knight(paper, 213, 168, 4);
var k5  = new Knight(paper, 213, 65, 5);
var k6  = new Knight(paper, 123, 13, 6);


/* ***************************************************
 *
 * CREATE GAME MAP SETTLEMENTS
 *
 * *************************************************** */

var s1 = new Settlement(paper, 114, 90, 3);
var s2 = new Settlement(paper, 114, 194, 4);
var s3 = new Settlement(paper, 114, 300, 5);
var s4 = new Settlement(paper, 204, 248, 7);
var s5 = new Settlement(paper, 204, 140, 9);
var s6 = new Settlement(paper, 204, 35, 11);


/* ***************************************************
 *
 * CREATE GAME MAP CITIES
 *
 * *************************************************** */

var c1 = new City(paper, 15, 141, 7);
var c2 = new City(paper, 15, 245, 12);
var c3 = new City(paper, 290, 192, 20);
var c4 = new City(paper, 290, 86, 30);

window.onresize = calculateScreenSize;
window.onload = calculateScreenSize;

function calculateScreenSize() {
    var sW = screen.availWidth;
    if (sW <= 320) {
        paper.setViewBox(0, 0, 375, 325, true);
    } else {
        paper.setViewBox(0, 0, 325, 325, true);
    }
}