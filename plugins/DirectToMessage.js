function DirectToMessage(ctx) {
  const obj = ctx.req.query?.feedback;
  if (obj) {
    const decodedObj = getMessage(obj);
    const parsedObj = JSON.parse(decodedObj);
    ctx.req.feedback = parsedObj;
  } else {
    ctx.req.feedback = false;
  }
}
function getMessage(encodedObj) {
  const decodedObj = decodeURIComponent(encodedObj);
  if (decodedObj !== "undefined" && decodedObj !== "null") {
    return decodedObj;
  } else {
    return false;
  }
}

module.exports = DirectToMessage;
