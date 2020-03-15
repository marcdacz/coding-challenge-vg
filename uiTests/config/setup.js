global._ = require("lodash");
global.fs = require("fs-extra");
global.chai = require("chai");
global.expect = chai.expect;
global.superagent = require("superagent");
global.jsonp = require("superagent-jsonp");
global.playwright = require("playwright");
global.browserType = process.env.BROWSER;
global.environment = process.env.NODE_ENV;

console.log("----------------------------------------------");
console.log(`Environment:\t${environment}`);
console.log(`Browser:\t${browserType}`);
console.log("----------------------------------------------");

fs.ensureDirSync(`screenshots/${browserType}`);
