const jsdom = require("jsdom");
const {JSDOM} = jsdom;

global.dom = new JSDOM("<!DOCTYPE html><html><body></body></html>");
global.window = dom.window;
global.document = dom.window.document;
global.navigator = global.window.navigator;
