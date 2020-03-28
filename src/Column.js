import React from 'react';
import Draggable from 'react-draggable';

import AddCard from './AddCard.js';
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
    const cardComponents = this.props.cards.map((cardData) => {
      return (
        <Draggable
          {...this.props.dragHandlers}
          key={cardData.cardID}
          axis="y"
        >
          <div>
          <Card
            type={this.props.type}
            key={cardData.cardID}
            cardData={cardData}
            selectedCard={this.props.selectedCard}
            surfacedCards={this.props.surfacedCards}
            selectedCardInputValues={this.props.selectedCardInputValues}

            onCardSelect={this.props.onCardSelect}
            onCardChange={this.props.onCardChange}
          />
          </div>
        </Draggable>
      );
    });

    return (
      <div className={"column column-" + this.props.type + " col col-sm"}>
        <h1>{this.colName()}</h1>
        <AddCard
          type={this.props.type}
          selectedCard={this.props.selectedCard}

          onAddCard={this.props.onAddCard}
        />
        {cardComponents}
      </div>
    );
  }
}

export default Column;
