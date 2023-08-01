const { Router } = require("../../../../../index.js");
const { homeHandler } = require("../handlers/root.js");

const RootRouter = new Router();

RootRouter.get("/", homeHandler);

module.exports = RootRouter;
