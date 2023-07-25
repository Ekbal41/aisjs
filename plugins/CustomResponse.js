const ErrorBody = require("../core/error-body");

/**
 * Plugin for customizing res methods.
 * @param {object} ctx - The ctx object containing res.
 * @param {function} next - The next plugin function.
 */
const CustomResponse = (ctx) => {
  if (ctx.res) {
    /**
     * Sends a JSON res.
     * @param {object} data - The JSON data to send in the res.
     * @returns {void}
     */
    ctx.res.json = (data) => {
      ctx.res.setHeader("Content-Type", "application/json");
      return ctx.res.end(JSON.stringify(data));
    };

    ctx.res.directTo = (url, obj) => {
      ctx.res.statusCode = 302;
      const jsonObj = JSON.stringify(obj);
      ctx.res.setHeader(
        "Location",
        `${url}${jsonObj ? `?feedback=${jsonObj}` : ""}`
      );
      return ctx.res.end();
    };
    ctx.res.error = (err, msg) => {
      return ctx.res.end(ErrorBody(err, msg));
    };
  }
};

module.exports = CustomResponse;
