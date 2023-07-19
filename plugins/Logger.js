const { yellow, green, blue, cyan, red, magenta, white } = require("colorette");

const Logger = (ctx) => {
  let pluginCount = ctx.self.plugins.length;
  const { req, res } = ctx;
  const startTime = new Date();
  res.on("finish", () => {
    const endTime = new Date();
    const requestTime = endTime - startTime;
    const logLine = formatLogLine(endTime, req, res, requestTime, pluginCount);
    if (logLine.includes(`/${ctx.self.assetsFolder}`)) return;
    console.log(logLine);
  });
};

function formatLogLine(time, req, res, duration, pluginCount) {
  const timestamp = formatTime(time);
  const methodColor = getMethodColor(req.method);
  const statusColor = getStatusColor(res.statusCode);

  const logMessage = `${timestamp} [enova] ${methodColor(req.method)} ${
    req.url
  } ${statusColor(res.statusCode)} [plugins : ${statusColor(
    pluginCount
  )}] ${duration}ms`;

  return logMessage;
}

function formatTime(date) {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const time = yellow(`${hours}:${minutes}:${seconds}`);
  return time;
}

function getMethodColor(method) {
  switch (method) {
    case "GET":
      return green;
    case "POST":
      return yellow;
    case "PUT":
      return blue;
    case "PATCH":
      return cyan;
    case "DELETE":
      return red;
    default:
      return magenta;
  }
}

function getStatusColor(statusCode) {
  if (statusCode >= 200 && statusCode < 300) {
    return green;
  } else if (statusCode >= 300 && statusCode < 400) {
    return cyan;
  } else if (statusCode >= 400 && statusCode < 500) {
    return yellow;
  } else {
    return red;
  }
}

module.exports = Logger;
