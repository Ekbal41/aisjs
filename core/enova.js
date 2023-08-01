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
  constructor(opts = {}) {
    this.reqs = [];
    this.firstToRunPlugins = [];
    this.lastToRunPlugins = [];
    this.externalPlugins = [];
    this.addMethods();
    this.defaultPlugins();
    this.viewEngine = null;
    this.assetsFolder = "public";
    this.server = http.createServer(this.handleRequest.bind(this));
  }

  defaultPlugins() {
    this.firstToRunPlugins = [Logger, CustomResponse, RegisterHandler];
    this.lastToRunPlugins = [ParamsAndQueryParser, FeedBack, ResponseSender];
  }
  addMethods() {
    const httpMethods = ["GET", "POST", "DELETE", "UPDATE"];
    for (const method of httpMethods) {
      this.factory(method);
    }
  }

  register(pluginName, plugin) {
    switch (pluginName) {
      case "viewEngine":
        this.registerViewsEngine(plugin);
        break;
      case "assetsFolder":
        this.registerAssetsFolder(plugin);
        break;
      // Add cases for other plugins as needed
      default:
        throw new Error(`Unknown plugin name: ${pluginName}`);
    }
    return this;
  }

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

  addRoute(method, path, mids, callback) {
    this.reqs.push({
      method,
      path,
      mids,
      callback,
    });
  }

  registerViewsEngine(plugin) {
    const { name, engine, config } = plugin;
    this.viewEngine = {
      name,
      engine,
      config,
    };
  }

  registerAssetsFolder(plugin) {
    const { path } = plugin;
    if (!path) {
      throw new Error(`Assets folder path is required.`);
    }
    this.assetsFolder = path;
  }

  plugins(plgn) {
    if (Array.isArray(plgn)) {
      this.externalPlugins.push(...plgn);
    } else {
      this.externalPlugins.push(plgn);
    }

    return this;
  }

  features(ftur) {
    const routeGroups = Array.isArray(ftur) ? ftur : [ftur];
    routeGroups.forEach((group) => {
      const routeGroup = group.freqs;
      const prefix = group.fprefix;
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
    });
    return this;
  }

  factory(method) {
    this[method.toLowerCase()] = (path, ...mids) => {
      const callback = mids.pop();
      this.addRoute(method, path, mids, callback);
      return this;
    };
  }

  listen(...args) {
    this.server.listen(...args);
    return this;
  }
}

module.exports = (opts) => new Enova(opts);
