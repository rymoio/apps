katan-js
========

A simple helper library for creating Catan® themed SVG objects with the [Raphaël](http://raphaeljs.com/) library.

Basic Usage
-----------

Load the library in your HTML and create a `div` element to act as a canvas:
```html
<script src="katan.min.js"></script>
<div id="canvas"></div>
```

Initiate a new canvas and begin adding SVG elements:
```javascript
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
```

> **USER TIPS:** By default, most browsers allow text _inside_ an SVG to be selected. If you have a click-able text element, or you are dragging elements across other text elements, this can be annoying and undesirable. The fix is to add a small snippet to your CSS definitions:
>
    /* Disable text selection for any text elements in SVG objects */
    svg text {
        -webkit-user-select: none;
           -moz-user-select: none;
            -ms-user-select: none;
                user-select: none;
    }
    svg text::selection {
        background: none;
    }

> The above CSS has already been added to `katan.css` so that you don't have to remember to add it to every project. If it somehow causes issues with other elements of your page, you can override it in your custom stylesheets.

> The `katan.css` file is configured to look for a `/fonts` directory at the same directory level. You should place the `/fonts` folder inside the same directory as your `katan.css` file or you will not be able to use the provided resource icons.

Documentation
-------------

Available in the [docs](https://github.com/rymoio/katan-js/tree/master/docs) directory as Markdown or PDF.

Dependencies
------------

Requires that `raphael.js` v2.1.2+ is loaded on the page. Optionally, you can load the `katan+raphael.min.js` file on your page which includes all needed features.

Requires that `katan.css` is loaded on the page, and that the `font` directory has been copied correctly.

License
-------

[LICENSE](LICENSE)

Changelog
---------

[CHANGELOG](CHANGELOG)

Issues
------

[![Issue Stats](http://issuestats.com/github/rymoio/katan-js/badge/issue?style=flat)](http://issuestats.com/github/rymoio/katan-js)

You can log issues from the menu at right, or by [clicking here](https://github.com/rymoio/katan-js/issues). Curious about responsiveness? Check out our [Issue Stats](http://issuestats.com/github/rymoio/katan-js)!

Contribute
----------

[![Issue Stats](http://issuestats.com/github/rymoio/katan-js/badge/pr?style=flat)](http://issuestats.com/github/rymoio/katan-js)

1. [Fork](https://github.com/rymoio/katan-js/fork) this repo.
2. Create a branch `git checkout -b my_feature`
3. Commit your changes `git commit -am "Added Feature"`
4. Push to the branch `git push origin my_feature`
5. Open a [Pull Request](https://github.com/rymoio/katan-js/pulls)

---

> <small>_Catan and/or Prof. Easy are registered trademarks of Catan GmbH. This software is independent from Catan GmbH. Catan GmbH is in no way responsible for the contents._</small>