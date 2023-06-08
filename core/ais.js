const http = require("http");
const aisLogger = require("../plugins/aisLogger");
const aisParamsAndQueryParser = require("../plugins/aisParamsAndQueryParser");
const aisUrlParserAndResponseSender = require("../plugins/aisUrlParserAndResponseSender");
const aisCustomResponse = require("../plugins/aisCustomResponse");
const aisRegistersHandler = require("../plugins/aisRegistersHandler");

class Ais {
  constructor() {
    this.server = http.createServer(this.handleRequest.bind(this));
    this.httpRequests = [];
    this.plugins = [];
    this.defaultPlugins();
    this.viewEngine = null;
    this.assetsFolder = null;
  }
  registerPlugins(plugins) {
    if (Array.isArray(plugins)) {
      this.plugins.push(...plugins);
    } else {
      this.plugins.push(plugins);
    }
  }

  defaultPlugins() {
    this.registerPlugins([
      aisLogger,
      aisCustomResponse,
      aisParamsAndQueryParser,
      aisRegistersHandler,
      aisUrlParserAndResponseSender, // always leve this at the end
    ]);
  }

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
  async handleRequest(request, response) {
    const context = {
      request,
      response,
      ais: this,
      index: 0,
      routes: this.httpRequests,
      routeMatched: false,
    };

    const next = async (shouldSkip = false) => {
      const plugin = this.plugins[context.index];
      if (plugin) {
        context.index++;
        if (context.index === this.plugins.length) {
          await plugin(context, next);
        }
        if (shouldSkip) {
          if (context.index !== this.plugins.length) {
          }
          await next(shouldSkip);
        } else {
          await plugin(context, next);
        }
      }
    };

    try {
      await next();
    } catch (error) {
      console.error("Error occurred during plugin execution:", error);
      response.statusCode = 500;
      response.end("Internal Server Error");
    }
  }

  route(pathname, method, path, callback) {
    this.httpRequests.push({
      pathname,
      method,
      path,
      callback,
    });
  }

  registerRoutes(routes, prefix) {
    let prefixedPath;
    for (const route of routes) {
      const { pathname, method, path, callback } = route;
      prefixedPath = prefix ? (path === "/" ? prefix : prefix + path) : path;
      if (prefixedPath.charAt(0) !== "/") {
        prefixedPath = "/" + prefixedPath;
      }
      this.route(pathname, method, prefixedPath, callback);
    }
  }
  registerViewEngine(plugin) {
    const { name, engine, config } = plugin;

    if (!name || !engine) {
      throw new Error(
        "Invalid view engine registration. Please provide a name and an engine."
      );
    }

    this.viewEngine = {
      name,
      engine,
      config,
    };
  }

  registerAssetsFolder(plugin) {
    const { path } = plugin;

    if (!path) {
      throw new Error(
        "Invalid assets folder registration. Please provide a path."
      );
    }

    this.assetsFolder = path;
  }

  get(pathname, path, callback) {
    this.route(pathname, "GET", path, callback);
  }

  start(port) {
    this.server.listen(port, () => {
      console.log(
        `-----------------------<Server started on http://localhost:${port}>-----------------------------------`
      );
    });
  }
}

module.exports = Ais;
