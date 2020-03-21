import React from 'react';
import { TextInput, TextareaInput } from './input.js';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.onCardSelect = this.props.onCardSelect;
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick(e) {
    if (this.props.selected) {
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
    if (this.props.selectedCardInputValues === undefined) {
      return this.props[fieldName];
    }
    if (this.props.selectedCardInputValues[fieldName] === undefined) {
      return this.props[fieldName];
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
