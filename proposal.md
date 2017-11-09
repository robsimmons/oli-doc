Creating a lightweight custom activity.

A lightweight custom activity contains four or five things: an `init` method `render` method, an `persist` function, an `interpret` function, and an Activity object.

An optional `init` method, which can transform the Activity in some way. (This allows seeds to happen.)

A `render` method, which takes a QuestionData and produces the page (React-ish) or updates the state of the page (not react-ish).

A `persist` method, which takes the state of the page and produces a QuestionStorage.

A `grade` method, which takes a QuestionStorage and produces a list of keys that are used to provide feedback.

An Activity is a JSON list of Questions:
  - A Question is a prompt, an optional hint list, and a JSON list of parts
     - A Part is a score, an optional hint list, and a mapping from keys to scores and feedback

A QuestionData is a prompt, an optional _current hint_, and a JSON list of questions
  - A PartData is an optional _current hint_, and an arbitrary piece of JSON data.
     
A QuestionStorage is JSON list of PartStorage:
  - A PartStorage is an arbitrary piece of JSON data.
