const Enova = require("../../../../index.js");
const rootRoutes = require("./routes/root.js");
const authRoutes = require("./routes/auth/index.js");
const eAuth = require("./plugins/eAuth.js");
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

// Register routes here
app.route(rootRoutes);
app.route(authRoutes, "auth");

// For any custom Plugins, Register here
app.plugin([eAuth]);

app.start(8000);
