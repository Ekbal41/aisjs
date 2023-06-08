const http = require("http");
const logger = require("../plugins/logger");
const paramsAndQueryParser = require("../plugins/PQparser");
const urlParserPlugin = require("../plugins/urlparser");

class Ais {
  constructor() {
    this.server = http.createServer(this.handleRequest.bind(this));
    this.httpRequests = [];
    this.plugins = [];
    this.defaultPlugins();
  }
  use(plugin) {
    this.plugins.push(plugin);
  }
  defaultPlugins() {
    this.use(logger);
    this.use(paramsAndQueryParser);
    this.use(urlParserPlugin);
  }

  async handleRequest(request, response) {
    const context = {
      request,
      response,
      ais: this,
      index: 0,
      httpObj: this.httpRequests,
      isMatched: false,
    };

    const next = async () => {
      const plugin = this.plugins[context.index];
      if (plugin) {
        context.index++;
        await plugin(context, next);
      }
    };
    try {
      for (const plugin of this.plugins) {
        await plugin(context, next);
      }
    } catch (error) {
      console.error("Error occurred during plugin execution:", error);
      response.statusCode = 500;
      response.end("Internal Server Error");
    }
  }
  get(path, callback) {
    const requestObg = {
      method: "GET",
      path,
      callback,
    };
    this.httpRequests.push(requestObg);
  }

  start(port) {
    this.server.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  }
}

module.exports = Ais;
