const logger = (context) => {
  const { request, response } = context;
  const startTime = new Date();

  response.on("finish", () => {
    const endTime = new Date();
    const requestTime = endTime - startTime;

    const logLine = `${formatTime(endTime)} [ais] ${request.method} ${
      request.url
    } ${requestTime}ms`;
    console.log(logLine);
  });
};

function formatTime(date) {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const milliseconds = String(date.getMilliseconds()).padStart(3, "0");
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

module.exports = logger;