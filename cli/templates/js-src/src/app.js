const Enova = require("../../../../index.js");
const eAuth = require("./plugins/eAuth.js");
const AuthRouter = require("./routes/AuthRouter.js");
const RootRouter = require("./routes/RootRouter.js");

//Initialize Enova
const app = new Enova();

// Register routes here
app.router(RootRouter);
app.router(AuthRouter, "/auth");

// For any custom Plugins, Register here
app.plugin([eAuth]);

//Start the server on port 8000
app.start(8000);

//OTHER CONFIGURATIONS

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
