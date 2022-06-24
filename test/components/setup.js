const jsdom = require("jsdom");
const {JSDOM} = jsdom;
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";

global.dom = new JSDOM("<!DOCTYPE html><html><body></body></html>");
global.window = dom.window;
global.document = dom.window.document;
global.navigator = global.window.navigator;

configure({adapter: new Adapter()});

chai.use(chaiAsPromised);
