What is a custom activity?

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

``` ts
define({
    init: function() {
        const inputElem = document.createElement("input");
        inputElem["type"] = "text";
        inputElem["value"] = "Hello, World!";
        document.body.appendChild(inputElem);
    }
});
```

Notice that we're just attaching to the document body. If we wanted to be a bit more responsible, we might
have grabbed that `<div id="oli-embed">` and attached to that. We're in an iframe, though, so it doesn't much
matter.

(Why did we do `inputElem["type"]` instead of `inputElem.type`? Shh, this is actually Typescript.)

The other file is the `embed_activity` XML file. This file's name needs to match its top-level `id` property,
so because I made the `id="hello"`, the filename needs to be `content/$MODULE/x-oli-embed-activity/hello.xml`.

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE embed_activity PUBLIC "-//Carnegie Mellon University//DTD Embed 1.1//EN" "http://oli.cmu.edu/dtd/oli-embed-activity_1.0.dtd">
<embed_activity id="hello" width="500" height="300" >
    <title>Hello, Custom Activity!</title>
    <source>Integers/webcontent/hello.js</source>
</embed_activity>
```

(Note that the `<source>` tag includes `Integers/`, which would need to be changed if you have a different
value for `$MODULE`.)

With these two pieces in place we can test building our module, but we can't see it because it's not
referenced anywhere. Assuming you already have some workbook pages in `content/$MODULE/x-oli-workbook_page`,
you can add this into one of the `<body>` sections:

``` xml
<composite_activity purpose="learnbydoing">
    <wb:inline idref="hello" />
</composite_activity>
```

We now have a Hello World program: it gives us an editable text field that can't be saved or graded. We'll fix
both of those problems, one at a time.

Storing state with the Superactivity
====================================

First, we want to store state for our activity, so that when someone edits text and reloads the page, they
will see their own text, not the default hello-world message. We'll store this data as a File Record. File
Records are attached to Attempts. We don't need to worry much about what attempts are, because they are
managed by the SuperActivity. The SuperActivity is passed as the first argument to our `init` method.

We check for a file record `record` if our attempt number is `n` by checking for the record `record + n` in
the superactivity's `fileRecordList` property. (This is not a great interface, but we can build a better one.)
We'll make a new record whenever the input changes, and whenever the student reloads the page, their last
saved record will be loaded into the text field instead of the default message. This naturally gives a
four-step process to the custom activity:

``` ts
const INPUT_RECORD = "text_input";

define({
    init: function(superActivity: SuperActivity) {
        // STEP 1: Create HTML compontents
        const inputElem = document.createElement("input");
        inputElem["type"] = "text";

        // STEP 2: Restore saved state
        // Input field is stored in INPUT_RECORD
        if (superActivity.fileRecordList.hasOwnProperty(INPUT_RECORD + superActivity.currentAttempt)) {
            superActivity.loadFileRecord(INPUT_RECORD, superActivity.currentAttempt, response => {
                inputElem.value = response;
            });
        } else {
            inputElem.value = "Hello, World!";
        }

        // STEP 3: Set up handlers
        inputElem.oninput = () => {
            const value = inputElem.value;
            superActivity.writeFileRecord(
                INPUT_RECORD,
                "text/plain",
                superActivity.currentAttempt,
                value,
                response => {
                    console.log("Recorded input " + value + ", got response:");
                    console.log(response);
                }
            );
        };

        // STEP 4: Attach HTML compontents
        document.body.appendChild(inputElem);
    }
});
````

Scoring, attempting, completing
===============================


An Attempt has three potential states that we'll think about: unscored, scored, and completed. (It's possible
for an Attempt to be unscored and completed, but that's only used we'll only complete assignments that we've
scored.)

First we need to discuss the OLI data storage model, which is is centered around an idea of Attempts. Six
timestamps (stored as Unix millisecond-precision timestamps) are attached to attempts. ***Two appear to be
duplicates of two others?!***

 * `dateStarted` - This is never `undefined`, and is always the smallest number unless a clock skews
   somewhere. It records when the student's browser first loaded the question.
 * `dateScored` - This is `undefined` until a grade has been submitted, at which point it becomes the date of
   the most recent scoring attempt (multiple scoring attempts are allowed). It will always be strictly greater
   than `dateStarted` unless a clock skews somewhere.
 * `dateCompleted` - This is `undefined` until the attempt is completed, at which point no further changes can
   be made to the Attempt timestamps. For an automatically graded assignment, it will always be strictly
   greater than `dateScored` unless a clock skews somewhere. However, the Superactivity API allows un-scored
   questions to be completed (for instance, for human-in-the-loop grading). This would probably lead to
   a `dateScored` larger than `dateCompleted`, but I haven't tested that.
 * `dateModified` - This is never `undefined`, and is always equal to the greatest of the three previous
   fields (possibly unless a clock skews somewhere, don't know what would happen then).
 * `dateAccessed` - ***Is it possible for this to differ from `dateModified`?***
 * `dateSubmitted` - ***Is it possible for this to differ from `dateScored`?***

You normally don't have to worry about any of these, but they're useful for understanding the three-step
lifecycle of an Attempt: unscored, scored, scored and completed (plus an extra option, unscored and completed,
which we'll now never mention again).

XXX Raphael - is it a bug or potential bug that files data for an Attempt can be modified after the Attempt is
complete? Intuitively it seems like that should probably fail just as trying to score or complete a completed
attempt should fail.


Scratch Notes
=============

webContentFolder
currentAttempt
fileRecordList
sessionId
resourceId
activityGuid
timeZone

processStartData(?)
logAction(action)

loadFileRecord(rec, att, resp => ...)
writeFileRecord(rec, mimetype, att, data, resp => ...)

startAttempt(startData => ...)
scoreAttempt(?, ?, resp => ...)
endAttempt(resp => ...)
isCurrentAttemptCompleted()
