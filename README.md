# Qed

Qed is a troubleshooting tool for distributed teams. It keeps complex investigations coherent.

The guiding framework behind Qed's design is called [differential
diagnosis](https://en.wikipedia.org/wiki/Differential_diagnosis). Qed allows users to apply this
medical methodology - in which practitioners write out symptoms, hypotheses, and actions to be taken
– to troubleshooting problems in general.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
To run a development instance of it, use `npm start`. To run the tests, use `npm test`.

## Dev roadmap

We use [GitHub issues](https://github.com/danslimmon/qed/issues) to track work on this project. Each
issue is associated with one of the following milestones:

* **Armos**
  * Cards can be created and manipulated.
  * Cards can be associated with one another.
  * Selecting a card causes it and all associated cards to be highlighted
* **Bokoblin**
  * User can comment on cards
  * Cards have a history section containing comments and changes
  * When graying a card, the user may optionally add a comment to the card
  * After graying a card, the user may optionally review all related cards
* **Chuchu**
  * The board has a name, which can be changed
  * There is a history pane that contains a log of every action taken on the board
* **Dinraal**
  * A new board can be created and linked to
  * Board state is stored in a database
  * Changes made in one browser window are reflected in another
* **Eyegore**
  * An instance of the application can be integrated with an authentication backend
  * Comments and changes are attributed to an authenticated user
