const Enova = require("../../../index.js");

//Initialize Enova
const app = new Enova();

//Default assets folder is set to public
// app.register("assetsFolder", {
//   path: "your_assets_folder_name",
// });

//For now, only nunjucks and ejs are supported
//Nunjucks is set as default view engine
//See Nunjucks docs for more info - https://mozilla.github.io/nunjucks/templating.html
// app.register("viewEngine", {
//   name: "view_engine_name",
//   engine: view_emgine,
//   config: {}, //options for the view engine
// });

app.get("/", (req, res) => {
  const title = "Default Nunjucks Template";
  res.render5("views/index.html", { title });
});

// For any custom Plugins, Register here
// app.registerPlugins([TestPlugin]);

app.start(8000);
module.exports = app;
