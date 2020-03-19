import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Card from "./Card.js";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders correctly when surfaced but not selected", () => {
  act(() => {
    render(<Card
      type={"sym"}
      title={"lorem ipsum"}
      description={"dolor sit amet"}
      selected={false}
      surfaced={true}
      selectedCardInputValues={{}}
    />, container);
  });
  expect(container.querySelector("div.card").classList).toContain("card-sym");
  expect(container.querySelector("div.card").classList).toContain("card-surfaced");
  expect(container.querySelector("div.cardTitle").textContent).toBe("lorem ipsum");
  expect(container.querySelector("div.cardDescription").textContent).toBe("dolor sit amet");
})
