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
      >
        {props.value}
      </textarea>
    </div>
  );
}

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFocused: false,

      // entered* are the current value in the text inputs, which may be different from props.title
      // and props.description after a change has been made but before the form is submitted.
      enteredTitle: props.title,
      enteredDescription: props.description
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  handleClick() {
    this.setState({isFocused: !this.state.isFocused});
  }

  renderDefocused() {
    return (
      <div className={"card card-" + this.props.type + " card-defocused"} onClick={this.handleClick}>
        <div className="cardTitle">{this.props.title}</div>
        <div className="cardDescription">{this.props.description}</div>
      </div>
    );
  }

  renderFocused() {
    return (
      <div className={"card card-" + this.props.type + " card-focused"} onClick={this.handleClick}>
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

  // Handles submitting of the form inside a focused card.
  handleSubmit(e) {
    e.preventDefault();
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

  render() {
    if (this.state.isFocused) {
      return this.renderFocused();
    }
    return this.renderDefocused();
  }
}

class Column extends React.Component {
  render() {
    let cards;
    switch (this.props.type) {
      case "hyp":
        cards = (
          <Card
            title="blibbity blobbity"
            description="This is a hypothesis about our observed symptoms."
            type={this.props.type}
            key="mnopqr"
          />
        );
        break;
      case "act":
        cards = [
          {
            title: "lorem ipsum",
            key: "abcdef",
            description: "This is an action that we're taking to rule out some hypothesis.",
          },
          {
            title: "dolor sit amet",
            key: "ghijkl",
            description: "This is a research action that doesn't relate to any specific hypothesis but should help us generate more hypotheses.",
          },
        ].map((item) => {
          return (
            <Card
              title={item.title}
              description={item.description}
              type={this.props.type}
              key={item.key}
            />
          );
        });
        break;
      case "sym":
        break;
      default:
        console.log("error: rendered column with unknown type " + this.props.type);
        cards = [];
    }

    return (
      <div className={"column column-" + this.props.type + " col-sm"}>
        {cards}
      </div>
    );
  }
}

class Board extends React.Component {
  render() {
    return (
      <div className="board row">
        <Column type="sym" />
        <Column type="hyp" />
        <Column type="act" />
      </div>
    );
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
