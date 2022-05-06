import React from "react";
import {expect} from "chai";
import {shallow} from "enzyme";
import TableBooleanTemplate from "../../../../app/components/Explorer/NetworkParameters/ParameterValue/TableBooleanTemplate";

describe("TableBooleanTemplate", () => {
    const cases: {
        value: boolean;
        text: "true" | "false";
    }[] = [
        {value: true, text: "true"},
        {value: false, text: "false"}
    ];

    cases.forEach(({value, text}) => {
        describe(`when called with "${text}" value`, () => {
            it(`should return correct ${text}`, async () => {
                const wrapper = shallow(<TableBooleanTemplate value={value} />);

                expect(wrapper.text()).equals(text);
            });
        });
    });
});
