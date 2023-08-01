const { feature } = require("../../../../../index.js");
const handler = require("./handler.js");
module.exports = Api = feature().prefix("/api/v1", handler.apiHome);
