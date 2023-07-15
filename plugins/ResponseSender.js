const path = require("path");
const fs = require("fs");
const { join } = require("path");
const { red, magenta } = require("colorette");
const { handleMethods, collectRequestBody } = require("../core/methods.js");
const ErorrBody = require("../core/erorr-body.js");

const ResponseSender = async (ctx) => {
  const { self, req, res, enova, currentRoute, routeMatched } = ctx;
  const assetsFolder = self.assetsFolder.startsWith("/")
    ? self.assetsFolder
    : "/" + self.assetsFolder;
  if (routeMatched) {
    const { method, mids, callback } = currentRoute;
    for (const mid of mids) {
      try {
        if (req.method === method) {
          handleMethods(res, req, method);
          await mid(req, res, enova);
        } else {
          res.erorr(`
          Requested ${req.method} method not supported on this route! </br>
          Erorr in Middlewire ${mid.name || "_______"} on Route ${
            currentRoute.path || "_______"
          } .
          `);
        }
      } catch (err) {
        console.log(`
            ${red("Error")} in Middlewire <${magenta(
          mid.name || "_______"
        )}> on Route <${magenta(currentRoute.path || "_______")}> . ${err}
          `);

        res.erorr(
          `Erorr in Middlewire ${mid.name || "_______"} on Route ${
            currentRoute.path || "_______"
          } </br>
            ${err} 
            `
        );
      }
    }

    try {
      if (req.method === method) {
        handleMethods(res, req, method);
        if (req.method === "POST" || req.method === "UPDATE") {
          const requestBody = await collectRequestBody(req);
          const data = Object.fromEntries(new URLSearchParams(requestBody));
          req.formData = data;
        }
        await callback(req, res, enova);
      } else {
        res.erorr(`
        Requested ${req.method} method not supported on this route! </br>
        Erorr in Callback of Route ${currentRoute.path || "_______"} .
        `);
      }
    } catch (err) {
      console.log(`
        ${red("Error")} in Callback of Route <${magenta(
        currentRoute.path || "_______"
      )}> . ${err}
      `);

      res.erorr(
        `Erorr in Callback of Route ${currentRoute.path || "_______"} .</br>
        ${err} 
        `
      );
    }
  }
  if (!routeMatched) {
    const isAssetPath = req.url.startsWith(assetsFolder);
    if (isAssetPath) {
      serveStaticFile(req, res);
    } else {
      res.statusCode = 404;
      res.end(`
      ${req.url} not found on this server!
      Make sure you have registered the route.
      `);
    }
  }
};

const serveStaticFile = (req, res) => {
  let __dirname = process.cwd();
  const filePath = join(__dirname, req.url);
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.statusCode = 404;
      res.end("404 Not Found");
      return;
    }
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("Internal Server Error");
        return;
      }
      // Determine the Content-Type based on the file extension
      let contentType = "text/plain";
      const ext = path.extname(filePath);
      if (ext === ".html") {
        contentType = "text/html";
      } else if (ext === ".css") {
        contentType = "text/css";
      } else if (ext === ".js") {
        contentType = "text/javascript";
      }
      res.setHeader("Content-Type", contentType);
      res.statusCode = 200;
      res.end(data);
    });
  });
};
module.exports = ResponseSender;
