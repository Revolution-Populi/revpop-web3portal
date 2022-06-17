import {expect} from "chai";
import GetChanged from "../../../../../../app/Context/Fees/Application/Query/GetChanged/GetChanged";
import GetChangedHandler from "../../../../../../app/Context/Fees/Application/Query/GetChanged/GetChangedHandler";

describe("GetChanged", () => {
    let handler: GetChangedHandler;

    before(function() {
        handler = new GetChangedHandler();
    });

    describe("execute", () => {
        // const query = new GetChanged();
        // const result = handler.execute();
    });
});
