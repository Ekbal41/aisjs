const aisRegistersHandler = (ctx) => {
  const { self } = ctx;
  //Registering others
  const { name, engine, config } = self.viewEngine;
  if (name && engine) {
    if (name === "nunjucks") {
      engine.configure(config);
      const res = ctx.res;
      res.render = (view, ctx) => {
        try {
          res.end(engine.render(view, ctx));
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
  ctx.aiszo.jwtToken = (tok) => {
    console.log(`Your token is here${tok}`);
  };
};

module.exports = aisRegistersHandler;
