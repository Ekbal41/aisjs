paramsAndQueryParser = (context, next) => {
  const { httpObj, request } = context;

  //extract all the query parameters
  const query = request.url.split("?")[1];
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
  request.query = queryObj;

  //extract all the path parameters
  const path = request.url.split("?")[0];
  const pathObj = {};
  for (const requestObj of httpObj) {
    const { params } = paramsParser(requestObj.path, request.url.split("?")[0]);
    pathObj[requestObj.path] = params;
  }
  request.params = pathObj;
};
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

module.exports = paramsAndQueryParser;
