const Ais = require("./core/ais");
const app = new Ais();
app.get("/home", (request, response) => {
    response.end("Hello World!");
});
app.get("/home/:id", (request, response) => {
    response.end("Hello po!");
});
app.start(3000);
