const http = require("http");
const { cyan, red, magenta } = require("colorette");
const runPlugin = require("./plugin-runner.js");
const Logger = require("../plugins/Logger");
const ParamsAndQueryParser = require("../plugins/ParamsAndQueryParser");
const ResponseSender = require("../plugins/ResponseSender");
const CustomResponse = require("../plugins/CustomResponse");
const RegisterHandler = require("../plugins/RegisterHandler");
const FeedBack = require("../plugins/FeedBack");
class Enova {
  constructor() {
    this.server = http.createServer(this.handleRequest.bind(this));
    this.httpRequests = [];
    this.firstToRunPlugins = [];
    this.lastToRunPlugins = [];
    this.externalPlugins = [];
    this.defaultPlugins();
    this.viewEngine = null;
    this.assetsFolder = "public";
  }

  /**
   * Register the default plugins.
   */
  defaultPlugins() {
    this.firstToRunPlugins = [Logger, CustomResponse, RegisterHandler];
    this.lastToRunPlugins = [ParamsAndQueryParser, FeedBack, ResponseSender];
  }
  /**
   * Register a specific plugin by name.
   * @param {string} pluginName - The name of the plugin.
   * @param {object} plugin - The plugin object.
   */
  register(pluginName, plugin) {
    switch (pluginName) {
      case "viewEngine":
        this.registerViewEngine(plugin);
        break;
      case "assetsFolder":
        this.registerAssetsFolder(plugin);
        break;
      // Add cases for other plugins as needed
      default:
        throw new Error(`Unknown plugin name: ${pluginName}`);
    }
  }
  /**
   * Handle incoming HTTP requests.
   * @param {http.IncomingMessage} req - The incoming req object.
   * @param {http.ServerResponse} res - The server res object.
   */

  async handleRequest(req, res) {
    const ctx = {
      req,
      res,
      self: this,
      index: 0,
      enova: {},
      routeMatched: false,
      currentRoute: null,
    };

    runPlugin(this.firstToRunPlugins, ctx);
    runPlugin(this.externalPlugins, ctx);
    runPlugin(this.lastToRunPlugins, ctx);
  }

  /**
   * Register a route with a callback function.
   * @param {string} pathname - The pathname of the route.
   * @param {string} method - The HTTP method of the route.
   * @param {string} path - The path of the route.
   */
  addRoute(method, path, mids, callback) {
    this.httpRequests.push({
      method,
      path,
      mids,
      callback,
    });
  }

  /**
   * Register the view engine plugin.
   * @param {object} plugin - The view engine plugin configuration.
   */
  registerViewEngine(plugin) {
    const { name, engine, config } = plugin;
    this.viewEngine = {
      name,
      engine,
      config,
    };
  }
  /**
   * Register the assets folder plugin.
   * @param {object} plugin - The assets folder plugin configuration.
   */
  registerAssetsFolder(plugin) {
    const { path } = plugin;
    if (!path) {
      throw new Error(`Assets folder path is required.`);
    }
    this.assetsFolder = path;
  }

  /**
   * Register plugins to be used by the server.
   * @param {Array|object} plugins - An array or single plugin to register.
   */
  plugin(plgn) {
    if (Array.isArray(plgn)) {
      this.externalPlugins.push(...plgn);
    } else {
      this.externalPlugins.push(plgn);
    }
  }

  router(routerFile, prefix) {
    const routeGroup = routerFile.routerHttpRequests;
    routeGroup.forEach((route) => {
      const { method, path, mids = [], callback } = route;
      let prefixedPath = "";
      if (!prefix) {
        prefixedPath = path;
      } else if (path === "/") {
        if (prefix.startsWith("/")) {
          prefixedPath = prefix;
        } else {
          prefixedPath = "/" + prefix;
        }
      } else {
        if (prefix.startsWith("/")) {
          prefixedPath = prefix + path;
        } else {
          prefixedPath = "/" + prefix + path;
        }
      }
      this.addRoute(method, prefixedPath, mids, callback);
    });
  }

  get(path, ...mids) {
    const callback = mids.pop();
    this.addRoute("GET", path, mids, callback);
  }
  post(path, ...mids) {
    const callback = mids.pop();
    this.addRoute("POST", path, mids, callback);
  }
  delete(path, ...mids) {
    const callback = mids.pop();
    this.addRoute("DELETE", path, mids, callback);
  }
  update(path, ...mids) {
    const callback = mids.pop();
    this.addRoute("UPDATE", path, mids, callback);
  }
  /**
   * Start the server and listen on the specified port.
   * @param {number} port - The port number to listen on.
   */
  start(port) {
    this.server.listen(port, () => {
      console.log(
        `🦉 Server is running on ${cyan("http://localhost:")}${cyan(port)}.`
      );
    });
  }
}

module.exports = Enova;
