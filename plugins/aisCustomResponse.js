/**
 * Plugin for customizing response methods.
 * @param {object} context - The context object containing response.
 * @param {function} next - The next plugin function.
 */
const aisCustomResponse = (context, next) => {
  if (context.response) {
    /**
     * Sends a response message.
     * @param {string} message - The message to send in the response.
     * @returns {void}
     */
    context.response.send = (message) => {
      return context.response.end(message);
    };

    /**
     * Sends a JSON response.
     * @param {object} data - The JSON data to send in the response.
     * @returns {void}
     */
    context.response.json = (data) => {
      context.response.setHeader("Content-Type", "application/json");
      return context.response.end(JSON.stringify(data));
    };
  }
  next();
};

module.exports = aisCustomResponse;
