const Enova = require("../index.js");
const userRoutes = require("./routes/userRoutes.js");
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

app.get("/test", mid1, mid2, (req, res) => {
  res.json({ status: true });
});
function mid1() {
  console.log("mid1");
}
function mid2() {
  console.log("mid2");
}
const TestPlugin = (ctx) => {
  const { index } = ctx;
};
app.registerRoutes(userRoutes);
app.registerPlugins([TestPlugin]);
app.start(8000);
