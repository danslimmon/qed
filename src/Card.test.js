import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act, Simulate } from "react-dom/test-utils";

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
      cardData={{
        cardID: "abcdef",
        cardType: "sym",
        title: "lorem ipsum",
        description: "dolor sit amet"
      }}
      selectedCard={{cardID: "ghijkl"}}
      surfacedCards={["abcdef", "ghijkl"]}
      selectedCardInputValues={{}}
    />, container);
  });
  expect(container.querySelector("div.card").classList).toContain("card-sym");
  expect(container.querySelector("div.card").classList).toContain("card-surfaced");
  expect(container.querySelector("div.cardTitle").textContent).toBe("lorem ipsum");
  expect(container.querySelector("div.cardDescription").textContent).toBe("dolor sit amet");
})

it("renders correctly when desurfaced", () => {
  act(() => {
    render(<Card
      cardData={{
        cardID: "abcdef",
        cardType: "hyp",
        title: "my desurfaced hypothesis",
        description: "April is the coolest month."
      }}
      selectedCard={["ghijkl"]}
      surfacedCards={["ghijkl"]}
      selectedCardInputValues={{
        title: "flibbity bibbity boo"
      }}
    />, container);
  });
  expect(container.querySelector("div.card").classList).toContain("card-hyp");
  expect(container.querySelector("div.card").classList).toContain("card-desurfaced");
  expect(container.querySelector("div.cardTitle").textContent).toBe("my desurfaced hypothesis");
  expect(container.querySelector("div.cardDescription").textContent).toBe("April is the coolest month.");
})

it("responds correctly to being clicked", () => {
  const cardTitle = "whatever";
  let onCardSelectRan = false;
  let targetTitle;

  function ocs(e) {
    onCardSelectRan = true;
    targetTitle = e.target.props.cardData.title;
  }

  act(() => {
    render(<Card
      cardData={{
        cardID: "ghijkl",
        cardType: "act",
        title: cardTitle,
        description: "some action card"
      }}
      selectedCard={null}
      surfacedCards={["abcdef", "ghijkl"]}
      onCardSelect={ocs}
    />, container);
  });

  act(() => {
    Simulate.click(container.querySelector("div.card"));
  });

  expect(onCardSelectRan).toBe(true);
  expect(targetTitle).toBe(cardTitle);
});

it("renders when selected", () => {
  act(() => {
    render(<Card
      cardData={{
        cardID: "abcdef",
        cardType: "sym",
        title: "Everything is broken!!!",
        description: "We accidentally the website"
      }}
      selectedCard={{cardID: "abcdef"}}
      surfacedCards={["abcdef", "ghijkl"]}
      selectedCardInputValues={{}}
    />, container);
  });

  expect(container.querySelector(".card input[type=text]").value).toBe("Everything is broken!!!");
  expect(container.querySelector(".card textarea").value).toBe("We accidentally the website");
});

it("renders changes to fields when selected", () => {
  act(() => {
    render(<Card
      cardData={{
        cardID: "abcdef",
        cardType: "hyp",
        title: "ab",
        description: "de"
      }}
      selectedCard={{cardID: "abcdef"}}
      surfacedCards={["abcdef", "ghijkl"]}
      selectedCardInputValues={{title: "abc", description: "def"}}
    />, container);
  });

  expect(container.querySelector(".card input[type=text]").value).toBe("abc");
  expect(container.querySelector(".card textarea").value).toBe("def");

  unmountComponentAtNode(container);

  act(() => {
    render(<Card
      cardData={{
        cardID: "abcdef",
        cardType: "hyp",
        title: "ab",
        description: "de"
      }}
      selectedCard={{cardID: "abcdef"}}
      surfacedCards={["abcdef", "ghijkl"]}
      selectedCardInputValues={{title: "abc"}}
    />, container);
  });

  expect(container.querySelector(".card .cardTitle").value).toBe("abc");
  expect(container.querySelector(".card .cardDescription").value).toBe("de");
});

it("executes the OnChange callback correctly", () => {
  let onChangeTarget;

  function occ(e) {
    // target should be the form
    onChangeTarget = e.target;
  }

  act(() => {
    render(<Card
      cardData={{
        cardID: "abcdef",
        cardType: "sym",
        title: "pangram",
        description: "a quick brown fox jumps over the lazy dog"
      }}
      selectedCard={{cardID: "abcdef"}}
      surfacedCards={["abcdef", "ghijkl"]}
      selectedCardInputValues={{}}
      onCardChange={occ}
    />, container);
  });

  act(() => {
    Simulate.change(container.querySelector("input.cardTitle"), {target: {value: "pangra"}});
  });

  expect(onChangeTarget.value).toBe("pangra");

  act(() => {
    Simulate.change(container.querySelector("input.cardTitle"), {target: {value: "eat the pliers with love. pleasure burns!"}});
  });

  expect(onChangeTarget.value).toBe("eat the pliers with love. pleasure burns!");
});


it("has a working control bar", () => {
  let ocdParam;
  function ocd(cardID) {
    ocdParam = cardID;
  }

  act(() => {
    render(<Card
      cardData={{
        cardID: "abcdef",
        cardType: "sym",
        title: "pangram",
        description: "a quick brown fox jumps over the lazy dog"
      }}
      selectedCard={{cardID: "abcdef"}}
      surfacedCards={["abcdef", "ghijkl"]}
      selectedCardInputValues={{}}
      onCardDiscard={ocd}
    />, container);
  });

  expect(container.querySelector(".cardControlBar .discard")).toBeTruthy();

  act(() => {
    container.querySelector(".cardControlBar .discard").click();
  });

  expect(ocdParam).toBe("abcdef");
});
