const enova = require("../../../index.js");
const eAuth = require("./plugins/eAuth");
const Auth = require("./features/auth");
const Root = require("./features/root");
const Api = require("./features/api");

//Initialize Enova
const app = enova()
  .features([Root, Auth, Api])
  .plugins([eAuth])
  .listen(8000, () => {
    console.log(` > Server started on Http://localhost:8000`);
  });

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
