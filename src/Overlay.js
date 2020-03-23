import React from 'react';
import ReactDOM from 'react-dom';

const overlayRoot = document.getElementById("overlayRoot");

// <Overlay /> is the gray rectangle that covers most elements when a card is selected.
//
// It lives in a portal so that we don't have to worry about other elements' stacking contexts.
class Overlay extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
  }

  componentDidMount() {
    overlayRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    overlayRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      <div
        className={"cardOverlay cardOverlay-" + (this.props.shown ? "shown" : "hidden")}
        onClick={this.props.onOverlayClick}
      />,
      this.el
    );
  }
}

export default Overlay;
