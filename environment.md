This content has been moved:

https://github.com/CMUOLI/OLI/wiki/Creating-an-Embedded-Activity

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
