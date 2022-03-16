import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import Hello from "../../app/components/Hello";
import {expect} from "chai";

let container: HTMLDivElement;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
});

describe("Hello", () => {
    it("renders without a name", () => {
        act(() => {
            render(<Hello />, container);
        });

        const h1 = container.querySelector("h1");

        if (h1 !== null) {
            expect(h1.textContent).to.equal("Hey, stranger");
        }
    });

    it("renders with a name", () => {
        act(() => {
            render(<Hello name="Alex" />, container);
        });

        const h1 = container.querySelector("h1");

        if (h1 !== null) {
            expect(h1.textContent).to.equal("Hello, Alex!");
        }
    });
});
