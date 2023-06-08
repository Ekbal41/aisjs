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
  
const dynamicUrl = "/user/:id/table/:key/lalapo/:ukai/:tony/pop/opo/:oi";
const requestedUrl = "/user/12/table/23/sdsf/rhtr/thr/trur/trjur/pop";

const { params, path } = paramsParser(dynamicUrl, requestedUrl);
console.log("hello")

console.log("Params:", params);
console.log("Path:", path);