import React from 'react';
import { TextInput, TextareaInput } from './input.js';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.onCardSelect = this.props.onCardSelect;
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  isSelected() {
    return (this.props.selectedCard && this.props.cardData.cardID === this.props.selectedCard.cardID);
  }

  isSurfaced() {
    for (let i=0; i<this.props.surfacedCards.length; i++) {
      if (this.props.cardData.cardID === this.props.surfacedCards[i]) {
        return true;
      }
    }
    return false;
  }

  handleClick(e) {
    if (this.isSelected()) {
      return;
    }
    // bubble the event up to whatever's managing state
    this.onCardSelect({target: this});
  }

  handleSubmit(e) {
    e.preventDefault()
  }

  divClasses() {
    let classes = [
      "card",
      "card-" + this.props.cardData.cardType,
      "card-" + (this.isSelected() ? "selected" : "deselected"),
      "card-" + (this.isSurfaced() ? "surfaced" : "desurfaced")
    ];
    return classes.join(" ");
  }

  renderDeselected() {
    return (
      <div className={this.divClasses()} onClick={this.handleClick}>
        <div className="cardTitle">{this.props.cardData.title}</div>
        <div className="cardDescription">{this.props.cardData.description}</div>
      </div>
    );
  }

  fieldValue(fieldName) {
    if (!this.props.selectedCardInputValues) {
      return this.props.cardData[fieldName];
    }
    if (!this.props.selectedCardInputValues.hasOwnProperty(fieldName)) {
      return this.props.cardData[fieldName];
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
    return this.isSelected() ? this.renderSelected() : this.renderDeselected();
  }
}

export default Card;
