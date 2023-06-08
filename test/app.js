const Aiszo = require("../index.js");
const userRoutes = require("./routes/userRoutes.js");
const nunjucks = require("nunjucks");
const ais = new Aiszo();
ais.register("assetsFolder", {
  path: "assets",
});
ais.register("viewEngine", {
  name: "nunjucks",
  engine: nunjucks,
  config: {},
});
ais.registerRoutes(userRoutes);
ais.start(8000);
