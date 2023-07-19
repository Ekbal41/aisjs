const nunjucks = require("nunjucks");
const fs = require("fs");

const RegistersHandler = async (ctx) => {
  const { self } = ctx;
  //Registering others
  const res = ctx.res;
  const viewEngine = self.viewEngine;
  if (viewEngine !== undefined && viewEngine !== null) {
    if (!viewEngine.name || !viewEngine.engine) {
      res.erorr(`
      - Invalid view engine registration. </br>
      - Please provide a name and an engine.
      `);
    } else {
      res.render = (view, data) => {
        try {
          const { name, engine, config } = viewEngine;
          if (name === "ejs") {
            const template = fs.readFileSync(view, "utf-8");
            res.end(engine.render(template, data, config));
          }
        } catch (err) {
          console.log(`Error in view engine ${viewEngine.name}: `, err);
          
        }
      };
    }
  } else {
    res.render = (view, data) => {
      try {
        res.end(nunjucks.render(view, data));
      } catch (err) {
        console.log("Error in nunjucks render: ", err);
      }
    };
  }

  //Registering other things
  ctx.enova.jwtToken = (tok) => {
    console.log(`Your token is here${tok}`);
  };
};

module.exports = RegistersHandler;
