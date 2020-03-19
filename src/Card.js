import React from 'react';
import { TextInput, TextareaInput } from './input.js';

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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick(e) {
    if (this.props.selected) {
      return;
    }
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

  handleSubmit(e) {
    e.preventDefault()
  }

  divClasses() {
    let classes = [
      "card",
      "card-" + this.props.type,
      "card-" + (this.props.selected ? "selected" : "deselected"),
      "card-" + (this.props.surfaced ? "surfaced" : "desurfaced")
    ];
    return classes.join(" ");
  }

  renderDeselected() {
    return (
      <div className={this.divClasses()} onClick={this.handleClick}>
        <div className="cardTitle">{this.props.title}</div>
        <div className="cardDescription">{this.props.description}</div>
      </div>
    );
  }

  fieldValue(fieldName) {
    if (this.props.selectedCardInputValues[fieldName] === undefined) {
      return this.props[fieldName]
    }
    return this.props.selectedCardInputValues[fieldName];
  }

  renderSelected() {
    return (
      <div className={this.divClasses()} onClick={this.handleClick}>
        <form onSubmit={this.handleSubmit} onChange={this.props.onCardChange}>
          <TextInput
            name="title"
            className="cardTitle"
            default="New Symptom"
            value={this.fieldValue("title")}
          />
          <TextareaInput
            name="description"
            className="cardDescription"
            default="An inference-free description of a fact we've observed regarding the problem under investigation."
            value={this.fieldValue("description")}
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

export default Card;
