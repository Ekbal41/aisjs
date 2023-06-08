/**
 * Plugin for parsing and matching URLs with routes.
 * @param {object} context - The context object containing routes, request, and response.
 * @param {function} next - The next plugin function.
 */
const aisUrlParserAndResponseSender = (context, next) => {

  const { routes, request, response } = context;

  for (const requestObj of routes) {
    const regexPattern = urlToRegex(requestObj.path);
    const regex = new RegExp(`^${regexPattern}(\\?.*)?$`);

    if (request.url === "/" && requestObj.path === "/") {
      context.routeMatched = true;
      return requestObj.callback(request, response);
    }

    const optionallyMatched = regex.test(request.url);
    if (optionallyMatched) {
      context.routeMatched = true;
      return requestObj.callback(request, response);
    }
  }

  if (!context.routeMatched) {
    response.statusCode = 404;
    response.end(`${request.url} Route Not found`);
  }
  // next();
};

/**
 * Converts a URL string to a regular expression pattern.
 * @param {string} url - The URL string.
 * @returns {string} The regular expression pattern.
 */
function urlToRegex(url) {
  let regexPattern = "";

  for (let i = 0; i < url.length; i++) {
    const c = url.charAt(i);

    if (c === ":") {
      let param = "";
      let j;

      for (j = i + 1; j < url.length; j++) {
        if (/\w/.test(url.charAt(j))) {
          param += url.charAt(j);
        } else {
          break;
        }
      }

      regexPattern += `(?<${param}>\\w+)`;
      i = j - 1;
    } else {
      regexPattern += c;
    }
  }

  return regexPattern;
}

module.exports = aisUrlParserAndResponseSender;
