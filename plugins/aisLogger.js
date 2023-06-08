const { yellow, green, blue, cyan, red, magenta, white } = require("colorette");

const aisLogger = (context, next) => {
  let pluginCount = context.ais.plugins.length;
  const { request, response } = context;
  const startTime = new Date();
  response.on("finish", () => {
    const endTime = new Date();
    const requestTime = endTime - startTime;
    const logLine = formatLogLine(
      endTime,
      request,
      response,
      requestTime,
      pluginCount
    );
    console.log(logLine);
  });
  next();
};

function formatLogLine(time, request, response, duration, pluginCount) {
  const timestamp = formatTime(time);
  const methodColor = getMethodColor(request.method);
  const statusColor = getStatusColor(response.statusCode);

  const logMessage = `${timestamp} [ais] ${methodColor(request.method)} ${
    request.url
  } ${statusColor(response.statusCode)} [plugins : ${statusColor(
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

module.exports = aisLogger;
