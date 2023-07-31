const handleMethods = async (req, res, method) => {
  switch (method) {
    case "GET":
      res.statusCode = 200;
      break;
    case "POST":
      res.statusCode = 302;
      break;
    case "DELETE":
      res.statusCode = 204;
      break;
    case "UPDATE":
      res.statusCode = 200;
      break;
  }
};

const collectRequestBody = (req) => {
  return new Promise((resolve, reject) => {
    let requestBody = "";
    req.on("data", (chunk) => {
      requestBody += chunk;
    });
    req.on("end", () => {
      resolve(requestBody);
    });
    req.on("error", (error) => {
      reject(error);
    });
  });
};

module.exports = {
  handleMethods,
  collectRequestBody,
};
