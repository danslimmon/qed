import React from 'react';

class AddCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  typeToWord() {
    switch(this.props.type) {
      case "sym":
        return "Symptom";
      case "hyp":
        return "Hypothesis";
      case "act":
        return "Action";
      default:
        return "Unknown";
    }
  }

  divClasses() {
    let classes = [
      "row",
      "addCard",
      "addCard-" + this.props.type,
    ];
    return classes.join(" ");
  }

  render() {
    let isRelated = true;
    if (!this.props.selectedCard) {
      isRelated = false;
    } else if (this.props.selectedCard.cardType === this.props.type) {
      isRelated = false;
    }

    return (
      <div className={this.divClasses()} onClick={this.handleClick}>
        <span role="img" aria-label="plus">➕</span> New {isRelated ? "Related " : ""}{this.typeToWord()}
      </div>
    );
  }

  handleClick(e) {
    this.props.onAddCard({target: this});
  }
}

export default AddCard;
