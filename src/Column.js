import React from 'react';
import Card from './Card.js';

class Column extends React.Component {
  colName() {
    switch (this.props.type) {
      case "sym":
        return "Symptoms";
      case "hyp":
        return "Hypotheses";
      case "act":
        return "Actions";
      default:
        console.log("Unknown column type '" + this.props.type + "' passed to <Column />");
        return "Unknown Column";
    }
  }

  render() {
    let cardComponents = this.props.cards.map((cardData) => {return (
      <Card
        type={this.props.type}
        key={cardData.cardID}
        cardID={cardData.cardID}
        title={cardData.title}
        description={cardData.description}
        selected={this.props.selectedCard === cardData.cardID}
        surfaced={this.props.surfacedCards.includes(cardData.cardID)}
        selectedCardInputValues={this.props.selectedCardInputValues}

        onCardSelect={this.props.onCardSelect}
        onCardChange={this.props.onCardChange}
      />
    )});

    return (
      <div className={"column column-" + this.props.type + " col-sm"}>
        <h1>{this.colName()}</h1>
        {cardComponents}
      </div>
    );
  }
}

export default Column;
