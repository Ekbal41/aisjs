const { homeHandler } = require("../handlers/root.js");

const rootRoutes = [
  {
    method: "GET",
    path: "/",
    mids: [],
    callback: homeHandler,
  },

];
module.exports = rootRoutes;
