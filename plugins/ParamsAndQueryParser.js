ParamsAndQueryParser = (ctx) => {
  const { req, self } = ctx;
  let localCurrentRoute = "";
  for (const route of self.httpRequests) {
    const path = route.path?.toString();
    const regexPattern = urlToRegex(path);
    const regex = new RegExp(`^${regexPattern}(\\?.*)?$`);

    if (req.url === "/" && route.path === "/") {
      ctx.routeMatched = true;
      ctx.currentRoute = route;
      localCurrentRoute = route;
    }

    const itsMatched = regex.test(req.url);
    if (itsMatched) {
      ctx.routeMatched = true;
      ctx.currentRoute = route;
      localCurrentRoute = route;
    }
  }

  let queries = {};
  queries = extractQuery(req.url);
  req.query = queries;

  let params = {};
  let _url = localCurrentRoute.path || "";
  const parsedRoute = urlToRegex(_url);
  const m = req.url.match(new RegExp(parsedRoute));
  if (m?.groups !== null && m?.groups !== undefined) {
    for (const [key, value] of Object.entries(m?.groups)) {
      params[key] = value;
    }
  } else {
    params = {};
  }
  req.params = params;

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
};
module.exports = ParamsAndQueryParser;
