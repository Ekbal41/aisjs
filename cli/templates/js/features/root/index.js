const { Feature } = require("../../../../../index.js");
const handler = require("./handler.js");
const Root = new Feature();

Root.get("/", handler.home);

module.exports = Root;
