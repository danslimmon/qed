import React from 'react';
import { noop } from './util.js'

class CardControlBar extends React.Component {
  render() {
    return (
      <div className="cardControlBar row" onClick={this.props.onClick}>
        <button className="discard"><span role="img" aria-label="red X">❌</span></button>
      </div>
    );
  }
}

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.titleInput = React.createRef();
    this.onCardSelect = this.props.onCardSelect;
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // focus title field of newly created card
    // 
    // this should be the only situation where this conditional holds. fingers crossed emoji.
    if (this.isSelected() && this.props.cardData.title === "" && this.props.cardData.description === "" && !this.props.selectedCardInputValues.keys) {
      this.titleInput.current.focus();
    }
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

  isDiscarded() {
    return this.props.cardData.discarded;
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
      "row",
      "card",
      "card-" + this.props.cardData.cardType,
      "card-" + (this.isSelected() ? "selected" : "deselected"),
      "card-" + (this.isSurfaced() ? "surfaced" : "desurfaced")
    ];
    if (this.isDiscarded()) {
      classes.push("card-discarded")
    };
    return classes.join(" ");
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

  renderDeselected() {
    return (
      <div className={this.divClasses()} onClick={this.handleClick}>
        <div className="cardTitle">{this.props.cardData.title}</div>
        <div className="cardDescription">{this.props.cardData.description}</div>
      </div>
    );
  }

  renderSelected() {
    return (
      <div className={this.divClasses()} onClick={this.handleClick}>
        <CardControlBar
          onClick={() => {this.props.onCardDiscard(this.props.cardData.cardID);}}
        />
        <form onSubmit={this.handleSubmit} onChange={this.props.onCardChange}>
          <div className="form-group">
            <input
              ref={this.titleInput}
              className="cardTitle"
              type="text"
              name="title"
              value={this.fieldValue("title")}
              // Avoids the annoying and baseless warnings about "you provided a `value` prop to a form
              // field without an `onChange` handler.
              onChange={noop}
            />
          </div>
          <div className="form-group">
            <textarea
              className="cardDescription"
              name="description"
              /*defaultValue="An inference-free description of a fact we've observed regarding the problem"*/
              value={this.fieldValue("description")}
              // Avoids the annoying and baseless warnings about "you provided a `value` prop to a form
              // field without an `onChange` handler.
              onChange={noop}
            />
          </div>
        </form>
      </div>
    );
  }

  render() {
    return this.isSelected() ? this.renderSelected() : this.renderDeselected();
  }
}

export default Card;
