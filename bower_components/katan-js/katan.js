/*! ***************************************************
 *                __
 *               / _)
 *        .-^^^-/ /
 *     __/       /
 *    <__.|_|-|_|   katan-js
 *                  version : 1.0.0
 *                  author  : Ryan Morrissey
 *                  license : MIT
 *                  website : https://rymo.io/
 *
 * ************************************************** !*/

(function (window, document, undefined) {

    // ******************** //
    //      CONSTANTS       //
    // ******************** //

    var katan,
        hextile,
        road,
        knight,
        settlement,
        city,

        VERSION = '1.0.0',

        hasOwnProperty = Object.prototype.hasOwnProperty,
        parseInt = window.parseInt,
        parseFloat = window.parseFloat,

        // font information
        fontFamily = 'Katan',
        fontUnicode = {
            'brick'  : '\ue000',
            'ore'    : '\ue003',
            'wool'   : '\ue004',
            'lumber' : '\ue005',
            'grain'  : '\ue006',
            'desert' : '\u003F',
            ''       : ''
        },

        // color information
        flatUIColors = {
            alizarin     : "#E74C3C",
            amethyst     : "#9B59B6",
            asbestos     : "#7F8C8D",
            belizehole   : "#2980B9",
            carrot       : "#E67E22",
            clouds       : "#ECF0F1",
            concrete     : "#95A5A6",
            emerland     : "#2ECC71",
            greensea     : "#16A085",
            midnightblue : "#2C3E50",
            nephritis    : "#27AE60",
            orange       : "#F39C12",
            peterriver   : "#3498DB",
            pomegranate  : "#C0392B",
            pumpkin      : "#D35400",
            silver       : "#BDC3C7",
            sunflower    : "#F1C40F",
            turquoise    : "#1ABC9C",
            wetasphalt   : "#34495E",
            wisteria     : "#8E44AD"
        },

        noop = function () {};

    function hasOwnProp(a, b) {
        return hasOwnProperty.call(a, b);
    }

    function printMsg(lvl, msg) {
        if (typeof console !== 'undefined'
            && typeof lvl === 'string'
            && typeof msg === 'string') {

            switch (lvl.toLowerCase()) {
                case 'info':
                    console.info('Info: ' + msg);
                    break;
                case 'debug':
                    console.log('Debug: ' + msg);
                    break;
                case 'warn':
                    console.warn('Warning: ' + msg);
                    break;
                case 'error':
                    console.error('Error: ' + msg);
                    break;
                default:
                    console.log('Log: ' + msg);
            }
        }
    }

    // ******************** //
    //     CONSTRUCTORS     //
    // ******************** //

    /**
     * Katan prototype object
     *
     * @param {Str} a DOM element id string
     * @param {Int} cx coordinate for transform
     * @param {Int} cy coordinate for transform
     */
    function Katan(id, width, height) {
        var _isAKatanObject = true,
            paper = Raphael(id, width, height);
        paper.canvas.setAttribute('preserveAspectRatio', 'xMidYMid meet');

        getId = function () {
            return id;
        }

        getCanvas = function () {
            return paper;
        }
    }

    /**
     * HexTile prototype object
     *
     * @param {Object} a canvas object
     * @param {Object} override default options
     * @return {Object} hexagon set object
     */
    function HexTile(canvas, options) {
        var _isAKatanObject = true,
            options = (options || {});

        var defaults = {
            cx                     : 0,
            cy                     : 0,
            fill                   : flatUIColors.belizehole,
            stroke                 : 'none',
            strokeWidth            : 0,

            innerCircle            : false,
            innerCircleFill        : flatUIColors.clouds,
            innerCircleStroke      : 'none',
            innerCircleStrokeWidth : 0,
            textFill               : flatUIColors.belizehole,
            fontSize               : 18,
            fontWeight             : 400,
            resourceIcon           : '',

            state                  : false,
            stateFill              : flatUIColors.amethyst,
            stateStroke            : flatUIColors.clouds,
            stateStrokeWidth       : 2,
            stateTextFill          : flatUIColors.clouds,
            stateFontSize          : 18,
            stateFontWeight        : 400,
            stateCursor            : 'pointer',

            scale                  : [],
            rotate                 : [],

            // only override this if you know what you're doing!
            _coords                : 'M0,52 L30,0 L90,0 L120,52 L90,104 L30,104z'
        };

        // set default options
        for (var name in defaults) {
            !(name in options) && (options[name] = defaults[name]);
        }

        getOptions = function () {
            return options;
        }

        var tile = canvas.set(
            canvas.path(options._coords)
        ).attr({
            'fill'         : options.fill,
            'stroke'       : options.stroke,
            'stroke-width' : options.strokeWidth
        });

        var inner = canvas.set().data('state', false);
        if (options.innerCircle) {
            inner.push(
                canvas.circle(60, 52, 16).attr({
                    'fill'         : options.innerCircleFill,
                    'stroke'       : options.innerCircleStroke,
                    'stroke-width' : options.innerCircleStrokeWidth
                })
            );

            var _t = (fontUnicode[options.resourceIcon]) ? fontUnicode[options.resourceIcon] : '';

            inner.push(
                canvas.text(60, 52, _t).attr({
                    'fill'        : options.textFill,
                    'font-size'   : options.fontSize,
                    'font-family' : fontFamily,
                    'font-weight' : options.fontWeight
                })
            );
            tile.push(inner);
        }

        if (options.state) {
            inner.attr({'cursor': options.stateCursor});
            inner.click(function () {
                setElementState(inner, options);
            });
        }

        var scale, rotate;
        if (options.scale) {
            if (Array.isArray(options.scale)) {
                scale = 's' + options.scale.toString();
            } else if (parseFloat(options.scale) !== 'NaN') {
                scale = 's' + parseFloat(options.scale);
            } else {
                scale = '';
            }
        }

        if (options.rotate && parseFloat(options.rotate) !== 'NaN') {
            if (Array.isArray(options.rotate)) {
                rotate = 'r' + options.rotate.toString();
            } else if (parseFloat(options.rotate) !== 'NaN') {
                rotate = 'r' + parseFloat(options.rotate);
            } else {
                rotate = '';
            }
        }

        tile.transform('T' + options.cx + ',' + options.cy + rotate + scale);
    }

    /**
     * Road prototype object
     *
     * @param {Object} a canvas object
     * @param {Object} override default options
     * @return {Object} hexagon set object
     */
    function Road(canvas, options) {
        var _isAKatanObject = true,
            options = (options || {});

        var _w = 28;
        var defaults = {
            cx               : 0,
            cy               : 0,
            w                : _w,
            h                : _w/2,
            fill             : flatUIColors.clouds,
            stroke           : flatUIColors.midnightblue,
            strokeWidth      : 2,

            text             : '1',
            textFill         : flatUIColors.midnightblue,
            fontSize         : 12,
            fontWeight       : 700,

            state            : false,
            stateFill        : flatUIColors.amethyst,
            stateStroke      : flatUIColors.clouds,
            stateStrokeWidth : 2,
            stateTextFill    : flatUIColors.clouds,
            stateFontSize    : 12,
            stateFontWeight  : 700,
            stateCursor      : 'pointer',

            scale            : [],
            rotate           : []
        };

        // set default options
        for (var name in defaults) {
            !(name in options) && (options[name] = defaults[name]);
        }

        getOptions = function () {
            return options;
        };

        var road = canvas.set(
            canvas.rect(options.cx, options.cy, options.w, options.h)
        ).attr({
            'fill'         : options.fill,
            'stroke'       : options.stroke,
            'stroke-width' : options.strokeWidth
        }).data('state', false);

        road.push(
            canvas.text(
                options.cx+(options.w/2),
                options.cy+(options.h/2),
                options.text
            ).attr(
                {
                    'fill'        : options.textFill,
                    'font-size'   : options.fontSize,
                    'font-weight' : options.fontWeight
                }
            )
        );

        if (options.state) {
            road.attr({'cursor': options.stateCursor});
            road.click(function () {
                setElementState(road, options);
            });
        }

        var scale, rotate;
        if (options.scale) {
            if (Array.isArray(options.scale)) {
                scale = 's' + options.scale.toString();
            } else if (parseFloat(options.scale) !== 'NaN') {
                scale = 's' + parseFloat(options.scale);
            } else {
                scale = '';
            }
        }

        if (options.rotate && parseFloat(options.rotate) !== 'NaN') {
            if (Array.isArray(options.rotate)) {
                rotate = 'r' + options.rotate.toString();
            } else if (parseFloat(options.rotate) !== 'NaN') {
                rotate = 'r' + parseFloat(options.rotate);
            } else {
                rotate = '';
            }
        }

        road.transform('T' + options.cx + ',' + options.cy + rotate + scale);
    }

    /**
     * Knight prototype object
     *
     * @param {Object} a canvas object
     * @param {Object} override default options
     * @return {Object} paper set object
     */
    function Knight(canvas, options) {
        var _isAKatanObject = true,
            options = (options || {});

        var defaults = {
            cx               : 0,
            cy               : 0,
            fill             : flatUIColors.clouds,
            stroke           : flatUIColors.midnightblue,
            strokeWidth      : 2,

            text             : '',
            textFill         : flatUIColors.midnightblue,
            fontSize         : 12,
            fontWeight       : 700,

            state            : false,
            stateFill        : flatUIColors.amethyst,
            stateStroke      : flatUIColors.clouds,
            stateStrokeWidth : 2,
            stateTextFill    : flatUIColors.clouds,
            stateFontSize    : 12,
            stateFontWeight  : 700,
            stateCursor      : 'pointer',

            scale            : [],
            rotate           : []
        };

        // set default options
        for (var name in defaults) {
            !(name in options) && (options[name] = defaults[name]);
        }

        getOptions = function () {
            return options;
        };

        var knight = canvas.set(
            canvas.ellipse(10, 18, 8, 18),
            canvas.circle(10, 7, 7)
        ).attr({
            'fill'         : options.fill,
            'stroke'       : options.stroke,
            'stroke-width' : options.strokeWidth
        }).data('state', false);

        knight.push(
            canvas.text(10, 23, options.text).attr({
                'fill'        : options.textFill,
                'font-size'   : options.fontSize,
                'font-weight' : options.fontWeight
            })
        );

        if (options.state) {
            knight.attr({'cursor': options.stateCursor});
            knight.click(function () {
                setElementState(knight, options);
            });
        }

        var scale, rotate;
        if (options.scale) {
            if (Array.isArray(options.scale)) {
                scale = 's' + options.scale.toString();
            } else if (parseFloat(options.scale) !== 'NaN') {
                scale = 's' + parseFloat(options.scale);
            } else {
                scale = '';
            }
        }

        if (options.rotate && parseFloat(options.rotate) !== 'NaN') {
            if (Array.isArray(options.rotate)) {
                rotate = 'r' + options.rotate.toString();
            } else if (parseFloat(options.rotate) !== 'NaN') {
                rotate = 'r' + parseFloat(options.rotate);
            } else {
                rotate = '';
            }
        }

        knight.transform('T' + options.cx + ',' + options.cy + rotate + scale);
    }

    /**
     * Settlement prototype object
     *
     * @param {Object} a canvas object
     * @param {Object} override default options
     * @return {Object} paper set object
     */
    function Settlement(canvas, options) {
        var _isAKatanObject = true,
            options = (options || {});

        var defaults = {
            cx               : 0,
            cy               : 0,
            fill             : flatUIColors.clouds,
            stroke           : flatUIColors.midnightblue,
            strokeWidth      : 2,

            text             : '',
            textFill         : flatUIColors.midnightblue,
            fontSize         : 12,
            fontWeight       : 700,

            state            : false,
            stateFill        : flatUIColors.amethyst,
            stateStroke      : flatUIColors.clouds,
            stateStrokeWidth : 2,
            stateTextFill    : flatUIColors.clouds,
            stateFontSize    : 12,
            stateFontWeight  : 700,
            stateCursor      : 'pointer',

            scale            : [],
            rotate           : [],

            // only override this if you know what you're doing!
            _coords          : "M0,8 L8,0 L16,8 L16,21 L0,21z"
        };

        // set default options
        for (var name in defaults) {
            !(name in options) && (options[name] = defaults[name]);
        }

        getOptions = function () {
            return options;
        };

        var settlement = canvas.set(
            canvas.path(options._coords)
        ).attr({
            'fill'         : options.fill,
            'stroke'       : options.stroke,
            'stroke-width' : options.strokeWidth
        }).data('state', false);

        settlement.push(
            canvas.text(8, 13, options.text).attr({
                'fill'        : options.textFill,
                'font-size'   : options.fontSize,
                'font-weight' : options.fontWeight
            })
        );

        if (options.state) {
            settlement.attr({'cursor': options.stateCursor});
            settlement.click(function () {
                setElementState(settlement, options);
            });
        }

        var scale, rotate;
        if (options.scale) {
            if (Array.isArray(options.scale)) {
                scale = 's' + options.scale.toString();
            } else if (parseFloat(options.scale) !== 'NaN') {
                scale = 's' + parseFloat(options.scale);
            } else {
                scale = '';
            }
        }

        if (options.rotate && parseFloat(options.rotate) !== 'NaN') {
            if (Array.isArray(options.rotate)) {
                rotate = 'r' + options.rotate.toString();
            } else if (parseFloat(options.rotate) !== 'NaN') {
                rotate = 'r' + parseFloat(options.rotate);
            } else {
                rotate = '';
            }
        }

        settlement.transform('T' + options.cx + ',' + options.cy + rotate + scale);
    }

    /**
     * City prototype object
     *
     * @param {Object} a canvas object
     * @param {Object} override default options
     * @return {Object} paper set object
     */
    function City(canvas, options) {
        var _isAKatanObject = true,
            options = (options || {});

        var defaults = {
            cx               : 0,
            cy               : 0,
            fill             : flatUIColors.clouds,
            stroke           : flatUIColors.midnightblue,
            strokeWidth      : 2,

            text             : '',
            textFill         : flatUIColors.midnightblue,
            fontSize         : 12,
            fontWeight       : 700,

            state            : false,
            stateFill        : flatUIColors.amethyst,
            stateStroke      : flatUIColors.clouds,
            stateStrokeWidth : 2,
            stateTextFill    : flatUIColors.clouds,
            stateFontSize    : 12,
            stateFontWeight  : 700,
            stateCursor      : 'pointer',

            scale            : [],
            rotate           : [],

            // only override this if you know what you're doing!
            _coords          : "M0,8 L8,8 L16,0 L24,8 L24,21 L0,21z"
        };

        // set default options
        for (var name in defaults) {
            !(name in options) && (options[name] = defaults[name]);
        }

        getOptions = function () {
            return options;
        };

        var city = canvas.set(
            canvas.path(options._coords)
        ).attr({
            'fill'         : options.fill,
            'stroke'       : options.stroke,
            'stroke-width' : options.strokeWidth
        }).data('state', false);

        city.push(
            canvas.text(15, 14, options.text).attr({
                'fill'        : options.textFill,
                'font-size'   : options.fontSize,
                'font-weight' : options.fontWeight
            })
        );

        if (options.state) {
            city.attr({'cursor': options.stateCursor});
            city.click(function () {
                setElementState(city, options);
            });
        }

        var scale, rotate;
        if (options.scale) {
            if (Array.isArray(options.scale)) {
                scale = 's' + options.scale.toString();
            } else if (parseFloat(options.scale) !== 'NaN') {
                scale = 's' + parseFloat(options.scale);
            } else {
                scale = '';
            }
        }

        if (options.rotate && parseFloat(options.rotate) !== 'NaN') {
            if (Array.isArray(options.rotate)) {
                rotate = 'r' + options.rotate.toString();
            } else if (parseFloat(options.rotate) !== 'NaN') {
                rotate = 'r' + parseFloat(options.rotate);
            } else {
                rotate = '';
            }
        }

        city.transform('T' + options.cx + ',' + options.cy + rotate + scale);
    }

    // ******************** //
    //       HELPERS        //
    // ******************** //

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    /**
     * @param {Object} a paper set object
     * @param {Object} a Katan options object
     * @return {None}
     */
    function setElementState(set, options) {
        // store the original options for easier toggling
        var orig_options;
        if (!set[0].data('orig_options')) {
            // no original options, so set them
            orig_options = {};
            set.forEach(function (elem, i) {
                orig_options[i] = elem.attr(['fill', 'stroke', 'stroke-width', 'font-size', 'font-weight']);
            });
            set.data('orig_options', orig_options);
        } else {
            // use previously stored options
            orig_options = set[0].data('orig_options');
        }

        if (!set[0].data('state')) {
            // activate the state
            set.forEach(function (elem, i) {
                if (['rect', 'circle', 'ellipse', 'path'].indexOf(elem.type) != -1) {
                    elem.attr({
                        'fill'         : options.stateFill,
                        'stroke'       : options.stateStroke,
                        'stroke-width' : options.stateStrokeWidth
                    });
                } else {
                    elem.attr({
                        'fill'         : options.stateTextFill,
                        'font-size'    : options.stateFontSize,
                        'font-weight'  : options.stateFontWeight
                    });
                }
            });
            set.data('state', true);
        } else {
            // deactivate the state
            set.forEach(function (elem, i) {
                if (['rect', 'circle', 'ellipse', 'path'].indexOf(elem.type) != -1) {
                    elem.attr({
                        'fill'         : orig_options[i]['fill'],
                        'stroke'       : orig_options[i]['stroke'],
                        'stroke-width' : orig_options[i]['stroke-width']
                    });
                } else {
                    elem.attr({
                        'fill'         : orig_options[i]['fill'],
                        'font-size'    : orig_options[i]['font-size'],
                        'font-weight'  : orig_options[i]['font-weight']
                    });
                }
            });
            set.data('state', false);
        }
    }

    // ************************* //
    //    TOP LEVEL FUNCTIONS    //
    // ************************* //

    katan = function (id, width, height) {
        return new Katan(id, width, height);
    };

    // version number
    katan.version = VERSION;

    // expose default colors for customization
    katan.getColors = function() {
        return flatUIColors;
    }

    // compare katan object
    katan.isKatan = function (obj) {
        return obj instanceof Katan
            || obj instanceof HexTile
            || obj instanceof Road
            || obj instanceof Knight
            || obj instanceof Settlement
            || obj instanceof City
            || (obj != null && hasOwnProp(obj, '_isAKatanObject'));
    };

    hextile = function (canvas, options) {
        return new HexTile(canvas, options);
    };

    road = function (canvas, options) {
        return new Road(canvas, options);
    };

    knight = function (canvas, options) {
        return new Knight(canvas, options);
    };

    settlement = function (canvas, options) {
        return new Settlement(canvas, options);
    };

    city = function (canvas, options) {
        return new City(canvas, options);
    };

    // ********************* //
    //    KATAN PROTOTYPE    //
    // ********************* //

    extend(katan.fn = Katan.prototype, {
        getId : function () {
            return getId();
        },

        getCanvas : function () {
            return getCanvas();
        }
    });

    window.Katan = katan;

    // *********************** //
    //    HEXTILE PROTOTYPE    //
    // *********************** //

    extend(hextile.fn = HexTile.prototype, {
        getOptions : function () {
            return getOptions();
        }
    });

    window.Katan.HexTile = hextile;

    // ******************** //
    //    ROAD PROTOTYPE    //
    // ******************** //

    extend(road.fn = Road.prototype, {
        getOptions : function () {
            return getOptions();
        }
    });

    window.Katan.Road = road;

    // ********************** //
    //    KNIGHT PROTOTYPE    //
    // ********************** //

    extend(knight.fn = Knight.prototype, {
        getOptions : function () {
            return getOptions();
        }
    });

    window.Katan.Knight = knight;

    // ************************** //
    //    SETTLEMENT PROTOTYPE    //
    // ************************** //

    extend(settlement.fn = Settlement.prototype, {
        getOptions : function () {
            return getOptions();
        }
    });

    window.Katan.Settlement = settlement;

    // ******************** //
    //    CITY PROTOTYPE    //
    // ******************** //

    extend(city.fn = City.prototype, {
        getOptions : function () {
            return getOptions();
        }
    });

    window.Katan.City = city;

})(window, document);