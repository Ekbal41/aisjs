/**
 * Plugin for parsing query parameters and extracting route parameters.
 * @param {object} context - The context object containing request and routes.
 * @param {function} next - The next plugin function.
 */
aisParamsAndQueryParser = (context, next) => {
  const { routes, request } = context;

  /**
   * Extracts query parameters from the URL.
   * @param {string} url - The URL containing the query parameters.
   * @returns {object} - The parsed query parameters as an object.
   */
  function extractQuery(url) {
    const query = url.split("?")[1];
    const queryObj = {};
    if (query) {
      const queryList = query.split("&");
      for (const query of queryList) {
        const [key, value] = query.split("=");
        if (key === "") {
          continue;
        }
        queryObj[key] = value;
      }
    }

    return queryObj;
  }
  let qObj = {};
  let queryObj = extractQuery(request.url);
  qObj = queryObj;
  request.query = qObj;
  const path = request.url.split("?")[0];
  const pathObj = {};
  for (const requestObj of routes) {
    const { params } = paramsParser(requestObj.path, request.url.split("?")[0]);
    pathObj[requestObj.pathname] = params;
  }
  request.params = pathObj;
  next();
};
/**
 * Parses dynamic route parameters from a dynamic URL.
 * @param {string} requestedUrl - The requested URL.
 * @returns {object} - The parsed route parameters and remaining path.
 */

function paramsParser(dynamicUrl, requestedUrl) {
  const dynamicParts = dynamicUrl.split("/");
  const requestedParts = requestedUrl.split("/");
  const params = {};
  let path = "";

  for (let i = 0; i < dynamicParts.length; i++) {
    const dynamicPart = dynamicParts[i];
    const requestedPart = requestedParts[i];

    if (dynamicPart.startsWith(":")) {
      const paramName = dynamicPart.substr(1);
      const paramValue = requestedPart;
      params[paramName] = paramValue;
    } else if (requestedPart) {
      path += "/" + requestedPart;
    }
  }

  return { params, path };
}
module.exports = aisParamsAndQueryParser;
