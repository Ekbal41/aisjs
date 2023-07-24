function DirectToMessage(ctx) {
  const messageBody = ctx.req.query?.message;
  if (messageBody) {
    const msg = getMessage(messageBody);
    ctx.req.message = msg;
  } else {
    ctx.req.message = false;
  }
}
function getMessage(message) {
  const decodedMessage = decodeURIComponent(message);
  if (decodedMessage !== "undefined" && decodedMessage !== "null") {
    return decodedMessage;
  } else {
    return false;
  }
}

module.exports = DirectToMessage;
