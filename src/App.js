import React from 'react';
import './App.css';

function TextInput(props) {
  return (
    <div className="form-group">
      <input
        className={props.className}
        type="text"
        name={props.name}
        default={props.default}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
}

function TextareaInput(props) {
  return (
    <div className="form-group">
      <textarea
        className={props.className}
        name={props.name}
        default={props.default}
        onChange={props.onChange}
        defaultValue={props.value}
      />
    </div>
  );
}

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // cards can be selected or unselected, surfaced or desurfaced.
      //
      // "selected" means a card has been clicked by the user and not yet deselected by clicking
      // elsewhere. a selected card can be edited, and the edits are saved when the card is
      // deselected.
      //
      // "surfaced" means a card is raised above the CardOverlay. cards related to the currently
      // selected card are surfaced in order to make their relevance clear.
      selected: this.props.selected,
      surfaced: this.props.surfaced,

      // entered* are the current value in the text inputs, which may be different from props.title
      // and props.description after a change has been made but before the form is submitted.
      enteredTitle: props.title,
      enteredDescription: props.description
    };

    this.onCardSelect = this.props.onCardSelect;

    this.handleClick = this.handleClick.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  handleClick(e) {
    // bubble the event up to whatever's managing state
    this.onCardSelect({target: this});
  }

  // Handles a change to the card's title.
  // 
  // By change we mean any transient alteration done by the user in the process of entering the
  // value. Submitting of a completed form is handled by handleSubmit().
  handleTitleChange(e) {
    this.setState({enteredTitle: e.target.value});
  }

  // Handles a change to the card's description.
  // 
  // By change we mean any transient alteration done by the user in the process of entering the
  // value. Submitting of a completed form is handled by handleSubmit().
  handleDescriptionChange(e) {
    this.setState({enteredDescription: e.target.value});
  }

  renderDeselected() {
    return (
      <div className={"card card-" + this.props.type + " card-deselected"} onClick={this.handleClick}>
        <div className="cardTitle">{this.props.title}</div>
        <div className="cardDescription">{this.props.description}</div>
      </div>
    );
  }

  renderSelected() {
    return (
      <div className={"card card-" + this.props.type + " card-selected"} onClick={this.handleClick}>
        <form onSubmit={this.handleSubmit}>
          <TextInput
            name="title"
            className="cardTitle"
            default="New Symptom"
            value={this.state.enteredTitle}
            onChange={this.handleTitleChange}
          />
          <TextareaInput
            name="description"
            className="cardDescription"
            default="An inference-free description of a fact we've observed regarding the problem under investigation."
            value={this.state.enteredDescription}
            onChange={this.handleDescriptionChange}
          />
        </form>
      </div>
    );
  }

  render() {
    if (this.props.selected) {
      return this.renderSelected();
    }
    return this.renderDeselected();
  }
}

class Column extends React.Component {
  render() {
    let cardComponents = this.props.cards.map((cardData) => {return (
      <Card
        type={this.props.type}
        key={cardData.cardID}
        cardID={cardData.cardID}
        title={cardData.title}
        description={cardData.description}
        selected={this.props.selectedCard === cardData.cardID}
        surfaced={this.props.surfacedCards}

        onCardSelect={this.props.onCardSelect}
        onCardUpdate={this.props.onCardUpdate}
      />
    )});

    return (
      <div className={"column column-" + this.props.type + " col-sm"}>
        {cardComponents}
      </div>
    );
  }
}

function CardOverlay(props) {
  return (
    <div
      className={"cardOverlay cardOverlay-" + (props.shown ? "shown" : "hidden")}
      onClick={props.onOverlayClick}
    />
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCard: null,
      overlayShown: false,
      cards: {
        sym: [],
        hyp: [
          {
            cardID: "mnopqr",
            title: "blibbity blobbity",
            description: "This is a hypothesis about our observed symptoms."
          }
        ],
        act: [
          {
            cardID: "abcdef",
            title: "lorem ipsum",
            description: "This is an action that we're taking to rule out some hypothesis.",
          },
          {
            cardID: "ghijkl",
            title: "dolor sit amet",
            description: "This is a research action that doesn't relate to any specific hypothesis but should help us generate more hypotheses.",
          }
        ]
      }
    }

    this.handleOverlayClick = this.handleOverlayClick.bind(this);
    this.handleCardSelect = this.handleCardSelect.bind(this);
    this.handleCardUpdate = this.handleCardUpdate.bind(this);
  }

  render() {
    let columns = ["sym", "hyp", "act"].map((colType) => (
      <Column
        type={colType}
        key={colType}
        cards={this.state.cards[colType]}
        selectedCard={this.state.selectedCard}
        surfacedCards={this.getSurfaced(this.state.selectedCard)}

        onCardSelect={this.handleCardSelect}
        onCardUpdate={this.handleCardUpdate}
      />
    ));

    return (
      <div className="board">
        <CardOverlay onOverlayClick={this.handleOverlayClick} shown={this.state.overlayShown} />
        <div className="board row">
          {columns}
        </div>
      </div>
    );
  }

  // Returns the list of card IDs that should be surfaced, given the ID of the selected card.
  getSurfaced(selectedCard) {
    return [selectedCard];
  }

  // Handles the event of the CardOverlay being clicked
  handleOverlayClick(e) {
    this.setState({
      selectedCard: null,
      overlayShown: false
    });
  }

  // Handles the event of a Card being selected.
  // 
  // The target of this event is a <Card /> component.
  handleCardSelect(e) {
    console.log("card selected: " + e.target.props.cardID);
    this.setState({
      selectedCard: e.target.props.cardID,
      overlayShown: true
    });
    // desurface all (unrelated) cards
  }

  // Handles the event of a Card being updated.
  //
  // This triggers when a user has made changes to a the card's attributes and those changes have
  // been finalized.
  handleCardUpdate(e) {
    console.log("card updated" + e.target.prop.cardID);
    // get the current state and alter the relevant card
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
