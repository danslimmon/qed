import React from 'react';
import { TextInput, TextareaInput } from './input.js';

class AddCard extends React.Component {
  typeToWord() {
    switch(this.props.type) {
      case "sym":
        return "Symptom";
        break;
      case "hyp":
        return "Hypothesis";
        break;
      case "act":
        return "Action";
        break;
      default:
        return "Unknown";
    }
  }

  divClasses() {
    let classes = [
      "addCard",
      "addCard-" + this.props.type,
    ];
    return classes.join(" ");
  }

  render() {
    return (
      <div className={this.divClasses()} onClick={this.props.onClick}>
        ➕ New {this.typeToWord()}
      </div>
    );
  }
}

export default AddCard;
