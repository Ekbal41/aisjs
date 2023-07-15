/**
 * Plugin for customizing res methods.
 * @param {object} ctx - The ctx object containing res.
 * @param {function} next - The next plugin function.
 */
const CustomResponse = (ctx) => {
  if (ctx.res) {
    /**
     * Sends a res message.
     * @param {string} message - The message to send in the res.
     * @returns {void}
     */
    ctx.res.send = (message) => {
      return ctx.res.end(message);
    };

    /**
     * Sends a JSON res.
     * @param {object} data - The JSON data to send in the res.
     * @returns {void}
     */
    ctx.res.json = (data) => {
      ctx.res.setHeader("Content-Type", "application/json");
      return ctx.res.end(JSON.stringify(data));
    };

    ctx.res.redirect = (url, message) => {
      ctx.res.statusCode = 302;
      ctx.res.setHeader(
        "Location",
        `${url}${message ? `?message=${message}` : ""}`
      );
      return ctx.res.end();
    };
  }
};

module.exports = CustomResponse;
