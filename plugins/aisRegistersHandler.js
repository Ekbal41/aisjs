const { createReadStream } = require("fs");
const { join } = require("path");
const aisRegistersHandler = (context, next) => {
  const { ais } = context;

  //Registering assets folder
  let __dirname = process.cwd();
  console.log(context.request.url);
  let assetsFolder = ais.assetsFolder;
  if (assetsFolder.startsWith("/")) {
  } else {
    assetsFolder = "/" + assetsFolder;
  }
  if (context.request.url.startsWith(assetsFolder)) {
    const filePath = join(__dirname, context.request.url);
    const stream = createReadStream(filePath);
    stream.pipe(context.response);
    return;
  }

  //Registering others
  const { name, engine, config } = ais.viewEngine;
  if (name && engine) {
    if (name === "nunjucks") {
      engine.configure(config);
      const res = context.response;
      res.render = (view, context) => {
        try {
          res.end(engine.render(view, context));
        } catch (err) {
          console.log("Error in nunjucks render: ", err);
        }
      };
    }
  } else {
    throw new Error(
      "Invalid view engine registration. Please provide a name and an engine."
    );
  }

  //Registering other things

  next();
};

module.exports = aisRegistersHandler;
