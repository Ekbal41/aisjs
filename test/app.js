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
const plugin1 = (ctx) => {
  const { index } = ctx;
};
const plugin2 = (ctx) => {
  const { index } = ctx;
};
ais.registerRoutes(userRoutes);
ais.registerPlugins([
  {
    name: "plugin1",
    body: plugin1,
  },
  {
    name: "plugin2",
    body: plugin2,
  },
]);
ais.start(8000);
