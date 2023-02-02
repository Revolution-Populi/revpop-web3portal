// import React from "react";
// import {expect} from "chai";
// import {shallow} from "enzyme";
// import TableBooleanTemplate from "../../../../../app/components/Explorer/NetworkParameters/ParameterValue/TableBooleanTemplate";
// import TableStringTemplate from "../../../../../app/components/Explorer/NetworkParameters/ParameterValue/TableStringTemplate";

// describe("TableBooleanTemplate", () => {
//     const cases: {
//         value: boolean;
//         text: "true" | "false";
//     }[] = [
//         {value: true, text: "true"},
//         {value: false, text: "false"}
//     ];

//     cases.forEach(({value, text}) => {
//         describe(`when called with "${text}" value`, () => {
//             it("have TableStringTemplate", async () => {
//                 const wrapper = shallow(<TableBooleanTemplate value={value} />);
//                 const tableStringTemplateWrapper = wrapper.find(
//                     TableStringTemplate
//                 );

//                 expect(tableStringTemplateWrapper).length(1);
//             });

//             it(`have "${text}" TableStringTemplate value`, async () => {
//                 const wrapper = shallow(<TableBooleanTemplate value={value} />);
//                 const tableStringTemplateWrapper = wrapper.find(
//                     TableStringTemplate
//                 );

//                 expect(tableStringTemplateWrapper.prop("value")).equals(text);
//             });
//         });
//     });
// });
