import React from "react";
import {expect} from "chai";
import {shallow} from "enzyme";
import {ParameterType} from "../../../../../app/Context/NetworkParameters/Domain/Factory";
import {ParameterValueType} from "../../../../../app/Context/NetworkParameters/Domain/NetworkParameter";
import ShowTemplate from "../../../../../app/components/Explorer/NetworkParameters/ParameterValue/TableTemplate";
import TableStringTemplate from "../../../../../app/components/Explorer/NetworkParameters/ParameterValue/TableStringTemplate";
import TableBooleanTemplate from "../../../../../app/components/Explorer/NetworkParameters/ParameterValue/TableBooleanTemplate";

describe("TableTemplate", () => {
    describe("resolve", () => {
        const cases: {
            type: ParameterType;
            value: ParameterValueType;
            component: typeof TableStringTemplate | typeof TableBooleanTemplate;
        }[] = [
            {type: "bool", value: true, component: TableBooleanTemplate},
            {type: "uint8_t", value: 10, component: TableStringTemplate},
            {type: "uint16_t", value: 10, component: TableStringTemplate},
            {type: "uint32_t", value: 10, component: TableStringTemplate},
            {type: "int64_t", value: 10, component: TableStringTemplate}
        ];

        cases.forEach(({type, value, component}) => {
            describe(`when called with ${type} type and ${value} value`, () => {
                it("should return correct component", async () => {
                    const wrapper = shallow(
                        <ShowTemplate type={type} value={value} />
                    );

                    expect(wrapper.find(component)).length(1);
                });
            });
        });
    });
});
