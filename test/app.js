const Ais = require("../index.js");
const userRoutes = require("./routes/userRoutes.js");
const ais = new Ais();
ais.register("assetsFolder", {
  path: "assets",
});
ais.registerRoutes(userRoutes, "ais");
ais.start(8000);
