import './App.css';

import React from 'react';
import { v4 as uuid } from 'uuid';

import Overlay from './Overlay.js';
import Column from './Column.js';

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCardID: null,
      // selectedCardInputValues holds the latest values input by the user that have not been saved
      // yet. If it is {}, no unsaved changes are present in the form. Otherwise it has a key for
      // each field that is unsaved.
      selectedCardInputValues: {},
      overlayShown: false,
      cards: [
        {
          cardID: "mnopqr",
          cardType: "hyp",
          title: "blibbity blobbity",
          description: "This is a hypothesis about our observed symptoms."
        },
        {
          cardID: "abcdef",
          cardType: "act",
          title: "lorem ipsum",
          description: "This is an action that we're taking to rule out some hypothesis.",
        },
        {
          cardID: "ghijkl",
          cardType: "act",
          title: "dolor sit amet",
          description: "This is a research action that doesn't relate to any specific hypothesis but should help us generate more hypotheses.",
        }
      ]
    }

    this.handleOverlayClick = this.handleOverlayClick.bind(this);
    this.handleCardSelect = this.handleCardSelect.bind(this);
    this.handleCardChange = this.handleCardChange.bind(this);
    this.handleAddCard = this.handleAddCard.bind(this);
  }

  getCard(cardID) {
    for (let i=0; i<this.state.cards.length; i++) {
      let cardData = this.state.cards[i];
      if (cardData.cardID === cardID) {
        return cardData;
      }
    }
    return null;
  }

  cardsByType(cardType) {
    return this.state.cards.filter((cardData) => {
      return (cardData.cardType === cardType);
    });
  }

  render() {
    const selectedCard = this.getCard(this.state.selectedCardID);

    let columns = ["sym", "hyp", "act"].map((colType) => (
      <Column
        type={colType}
        key={colType}
        cards={this.cardsByType(colType)}
        selectedCard={selectedCard}
        surfacedCards={this.getSurfaced(this.state.selectedCardID)}
        selectedCardInputValues={this.state.selectedCardInputValues}

        onCardSelect={this.handleCardSelect}
        onCardChange={this.handleCardChange}
        onAddCard={this.handleAddCard}
      />
    ));

    return (
      <div className="board row">
        <Overlay onOverlayClick={this.handleOverlayClick} shown={this.state.overlayShown} />
        <div className="row">
          {columns}
        </div>
      </div>
    );
  }

  // Returns the list of card IDs that should be surfaced, given the ID of the selected card.
  getSurfaced(selectedCard) {
    return [selectedCard];
  }

  // Handles the event of the Overlay being clicked
  handleOverlayClick(e) {
    if (this.state.selectedCardID === null) {
      return;
    }

    this.setState((state, props) => {
      // Merge the data entered by the user into the selected card's data
      for (let i=0; i<state.cards.length; i++) {
        if (state.cards[i].cardID === state.selectedCardID) {
          state.cards[i] = {
            ...state.cards[i],
            ...state.selectedCardInputValues
          };
          break;
        }
      };

      // Go back to having no selected card
      state.selectedCardID = null;
      state.selectedCardInputValues = {};
      state.overlayShown = false;

      return state;
    });
  }

  // Handles the event of a Card being selected.
  // 
  // The target of this event is a <Card /> component.
  handleCardSelect(e) {
    const target = e.target;
    this.setState((state, props) => {
      return {
        selectedCardID: target.props.cardData.cardID,
        overlayShown: true
      }
    });
  }

  // Handles the event of a Card being changed (input onChange, not submit).
  // 
  // The target of this event is a <Card /> component's input element.
  handleCardChange(e) {
    let target = e.target;
    this.setState((state, props) => {
      return {
        selectedCardInputValues: {
          ...state.selectedCardInputValues,
          [target.name]: target.value
        }
      };
    });
  }

  // Saves the currently selected card's contents to the DB.
  saveSelectedCard() {
    if (!this.state.selectedCardID) {
      console.log("no selected card to save");
      return;
    }
    console.log("would save card " + this.state.selectedCardID + " to database");
  }

  // Adds a new card of the given type.
  //
  // The new card will appear at the top of the cards list, and will be selected.
  newCard(cardType) {
    let newCardData = {
      cardID: uuid(),
      cardType: cardType,
      title: "",
      description: ""
    };

    this.setState((state, props) => {
      state.cards.unshift(newCardData);
      state.selectedCardID = newCardData.cardID;
      state.selectedCardInputValues = {}
      return state;
    });
  }

  // Handles the event of the AddCard button being clicked.
  // 
  // The target of this event is an <AddCard /> component.
  handleAddCard(e) {
    let target = e.target;
    this.saveSelectedCard();
    this.newCard(target.props.type);
  }
}

function App() {
  return (
    <div className="container">
      <Board />
    </div>
  );
}

export default App;
