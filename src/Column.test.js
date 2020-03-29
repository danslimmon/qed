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

it("determines when a given card is selected", () => {
  act(() => {
    let card = {
      cardID: "abcdef",
      cardType: "hyp",
      title: "the system is down",
      description: "come on everybody and fhgwhgads"
    }
    render(<Column
      type={"hyp"}
      cards={[card]}
      selectedCard={card}
      surfacedCards={["abcdef"]}
    />, container);
  });
  expect(container.querySelector(".card").classList).toContain("card-selected");
  expect(container.querySelector(".card").classList).toContain("card-surfaced");
  expect(container.querySelector(".card").classList).not.toContain("card-deselected");
  expect(container.querySelector(".card").classList).not.toContain("card-desurfaced");
});

it("orders cards correctly", () => {
  act(() => {
    const cards = [
      {
        cardID: "abcdef",
        cardType: "hyp",
        title: "this card is discarded",
        description: "this hypothesis is no longer considered valid",
        discarded: true
      },
      {
        cardID: "ghijkl",
        cardType: "hyp",
        title: "this card is NOT discarded",
        description: "this hypothesis may still hold water",
        discarded: false
      }
    ];
    render(<Column
      type={"hyp"}
      cards={cards}
      surfacedCards={[]}
    />, container);
  });

  expect(container.querySelectorAll(".card").length).toBe(2);
  const nodes = container.querySelectorAll(".cardTitle");
  expect(nodes[nodes.length-1].textContent).toBe("this card is discarded");
});
