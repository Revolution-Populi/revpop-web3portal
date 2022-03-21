import React from "react";
import Hello, {Header} from "../../app/components/Hello";
import {expect} from "chai";
import {shallow} from "enzyme";

describe("Hello testing by enzyme", () => {
    it("renders the Counter wrapper", () => {
        const wrapper = shallow(<Hello />);
        expect(wrapper.find(Header)).to.have.length(1);
    });

    it("with name", () => {
        const wrapper = shallow(<Hello name="Fake name" />);
        const headerWrapper = wrapper.find(Header);

        expect(headerWrapper.prop("title")).to.equal("Hello, Fake name!");
    });

    it("without name", () => {
        const wrapper = shallow(<Hello />);
        const headerWrapper = wrapper.find(Header);

        expect(headerWrapper.prop("title")).to.equal("Hey, stranger!");
    });
});

describe("Header", () => {
    it("renders title", () => {
        const wrapper = shallow(<Header title="fake title" />);

        const h1 = wrapper.find("h1");
        expect(h1).to.have.length(1);
        expect(h1.text()).to.equal("fake title");
    });
});
