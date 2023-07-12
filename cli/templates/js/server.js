const Enova = require("../../../index.js");
const nunjucks = require("nunjucks");
const app = new Enova();

app.register("assetsFolder", {
  path: "assets",
});
app.register("viewEngine", {
  name: "nunjucks",
  engine: nunjucks,
  config: {},
});

app.get("/", (req, res) => {
  res.render("views/index.html")
});

// app.registerPlugins([TestPlugin]);
app.start(8000);
module.exports = app;
