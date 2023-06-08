const http = require("http");
const aisLogger = require("../plugins/aisLogger");
const aisParamsAndQueryParser = require("../plugins/aisParamsAndQueryParser");
const aisResponseSender = require("../plugins/aisResponseSender");
const aisCustomResponse = require("../plugins/aisCustomResponse");
const aisRegistersHandler = require("../plugins/aisRegistersHandler");
class Aiszo {
  constructor() {
    this.server = http.createServer(this.handleRequest.bind(this));
    this.httpRequests = [];
    this.plugins = [];
    this.defaultPlugins();
    this.viewEngine = null;
    this.assetsFolder = null;
  }
  /**
   * Register plugins to be used by the server.
   * @param {Array|object} plugins - An array or single plugin to register.
   */
  registerPlugins(plugins) {
    if (Array.isArray(plugins)) {
      this.plugins.push(...plugins);
    } else {
      this.plugins.push(plugins);
    }
  }
  /**
   * Register the default plugins.
   */
  defaultPlugins() {
    this.registerPlugins([
      aisLogger,
      aisCustomResponse,
      aisParamsAndQueryParser,
      aisRegistersHandler,
      aisResponseSender, // always leve this at the end
    ]);
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
   * @param {http.IncomingMessage} request - The incoming request object.
   * @param {http.ServerResponse} response - The server response object.
   */
  async handleRequest(request, response) {
    const context = {
      request,
      response,
      ais: this,
      index: 0,
      routes: this.httpRequests,
      routeMatched: false,
    };
    /**
     * Call the next plugin in the chain.
     * @param {boolean} shouldSkip - Flag to skip the current plugin.
     */
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
  /**
   * Register a route with a callback function.
   * @param {string} pathname - The pathname of the route.
   * @param {string} method - The HTTP method of the route.
   * @param {string} path - The path of the route.
   * @param {function} callback - The callback function to be executed.
   */
  route(pathname, method, path, callback) {
    this.httpRequests.push({
      pathname,
      method,
      path,
      callback,
    });
  }
  /**
   * Register multiple routes with a common prefix.
   * @param {Array} routes - An array of route configurations.
   * @param {string} prefix - The common prefix for the routes.
   */
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
  /**
   * Register the view engine plugin.
   * @param {object} plugin - The view engine plugin configuration.
   */
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
  /**
   * Register the assets folder plugin.
   * @param {object} plugin - The assets folder plugin configuration.
   */
  registerAssetsFolder(plugin) {
    const { path } = plugin;

    if (!path) {
      throw new Error(
        "Invalid assets folder registration. Please provide a path."
      );
    }

    this.assetsFolder = path;
  }
  /**
   * Register a GET route with a callback function.
   * @param {string} pathname - The pathname of the route.
   * @param {string} path - The path of the route.
   * @param {function} callback - The callback function to be executed.
   */
  get(pathname, path, callback) {
    this.route(pathname, "GET", path, callback);
  }
  /**
   * Start the server and listen on the specified port.
   * @param {number} port - The port number to listen on.
   */
  start(port) {
    this.server.listen(port, () => {
      console.log(
        `-----------------------<Server started on http://localhost:${port}>-----------------------------------`
      );
    });
  }
}

module.exports = Aiszo;
