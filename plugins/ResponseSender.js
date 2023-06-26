const path = require("path");
const fs = require("fs");
const { join } = require("path");
const { red, magenta } = require("colorette");

const ResponseSender = async (ctx) => {
  const { self, req, res, enova, currentRoute, routeMatched } = ctx;
  const assetsFolder = self.assetsFolder.startsWith("/")
    ? self.assetsFolder
    : "/" + self.assetsFolder;
  if (routeMatched) {
    const { mids, callback } = currentRoute;
    for (const mid of mids) {
      try {
        await mid(req, res, enova);
      } catch (err) {
        console.log(`
          ${red("Error")} in Middlewire <${magenta(
          mid.name || "_______"
        )}> on Route <${magenta(currentRoute.path || "_______")}> . ${err}
        `);
        return;
      }
    }
    try {
      await callback(req, res, enova);
    } catch (err) {
      console.log(`
        ${red("Error")} in Callback of Route <${magenta(
        currentRoute.path || "_______"
      )}> . ${err}
      `);
    }

    // currentRoute?.callback(req, res, enova);
  }
  if (!routeMatched) {
    const isAssetPath = req.url.startsWith(assetsFolder);
    if (isAssetPath) {
      serveStaticFile(req, res);
    } else {
      res.statusCode = 404;
      res.end(`${req.url} not found on this server!`);
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
