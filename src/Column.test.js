import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";

import Column from "./Column.js";

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

it("renders empty", () => {
  act(() => {
    render(<Column
      type={"act"}
      cards={[]}
    />, container);
  });
  expect(container.querySelector("h1").textContent).toMatch(/Actions/);
  expect(container.querySelector(".column").classList).toContain("column-act");
  expect(container.querySelector(".addCard")).not.toBe(null);
});

it("renders with multiple cards", () => {
});
