import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";

import AddCard from "./AddCard.js";

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

it("renders", () => {
  act(() => {
    render(<AddCard
      type={"hyp"}
    />, container);
  });
  expect(container.querySelector(".addCard").classList).toContain("addCard-hyp");
  expect(container.querySelector(".addCard").textContent).toMatch(/Hypothesis/);
});
