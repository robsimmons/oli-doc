What is a custom activity? A custom activity is:

 * A [RequireJS module](http://requirejs.org/)
 * With an `init` method that exepcts two arguments, an OLI Superactivity object and a data object listing
   assets
 * Loaded dynamically by the OLI Superactivty into a mostly-empty iframe.

The OLI Superactivity activity runtime/framework
=================================================

The OLI Superactivity is a framework that loads into a blank webpage within an iframe. As of October 2017, the
page is [embed.html](https://dev-02.oli.cmu.edu/superactivity/embed/embed.html) and these are its contents:

```html
<!DOCTYPE html SYSTEM "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <title></title>
        <script src="https://code.jquery.com/jquery-1.12.4.min.js"   integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ="   crossorigin="anonymous"></script>
        <link href="/syntaxhighlighter/styles/shCore.css" rel="stylesheet" type="text/css" />
        <link href="/syntaxhighlighter/styles/shThemeDefault.css" rel="stylesheet" type="text/css" />
        <script src="/syntaxhighlighter/scripts/shCore.js" type="text/javascript"></script>
        <script src="/syntaxhighlighter/scripts/shBrushPython.js" type="text/javascript"></script>
        <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
        <script src="olilogging.js"></script>
        <script src="olisuperactivity.js"></script>
        <script src="oliactivitymodels.js"></script>
        <script src="require.js"></script>
    </head>
    <body>
        <div id="oli-embed"></div>
    </body>
</html>
```

Notice what this file doesn't have: it doesn't have any indication of where your custom activity is! These are
actually passed in as attributes of the iframe itself. The `olisuperactivity.js` file:

 1. Reads attributes that were attached to the iframe to find an `embed_activity` XML document. (This is the
    document that will get passed to the activity itself as a data object.)
 2. Reads that XML document to find the location of the RequireJS module and evaluates that module with
   `require`.
 3. Calls the custom activity's `init` method.

Hello, Custom Activity!
=======================

The absolutely minimal custom activity requires writing two files and editing a third in the `content/$MODULE`
directory of the subversion repository. In our example, `$MODULE` happens to be `Integers`.

The Javascript file is `content/$MODULE/webcontent/hello.js`. If there was more than one file in the activity
(and there almost always is more than one file), we would have put it in a directory, like
`content/$MODULE/webcontent/hello/main.js` or something. The filename can be anything, it just has to match
the filename in the `embed_activity` XML document.

``` js
define(function() {
    return {
        init: function(superClient, activityData) {
            let p = document.createElement("p");
            p.innerHTML = "Hello World";
            document.body.appendChild(p);
        }
    };
});
```

Notice that we're just attaching to the document body. If we wanted to be a bit more responsible, we might
have grabbed that `<div id="oli-embed">` and attached to that. We're in an iframe, though, so it doesn't much
matter.

The other file is the `embed_activity` XML file. It's filename needs to match its top-level `id` property, so
it is in `content/$MODULE/x-oli-embed-activity/hello.xml`.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE embed_activity PUBLIC "-//Carnegie Mellon University//DTD Embed 1.1//\
EN" "http://oli.cmu.edu/dtd/oli-embed-activity_1.0.dtd">
<embed_activity id="hello" width="500" height="300" >
    <title>Hello, Custom Activity!</title>
    <source>Integers/webcontent/hello.js</source>
</embed_activity>
```

(Note that the `<source>` tag includes `Integers/`, which would need to be changed if you have a different
value for `$MODULE`.)

With these two pieces in place we can test building our module, but we can't see it because it's not referenced anywhere. Assuming you already have some workbook pages in `content/$MODULE/x-oli-workbook_page`, you can
add this into one of the `<body>` sections:

``` xml
<composite_activity purpose="learnbydoing">
    <wb:inline idref="hello"/>
</composite_activity>
```