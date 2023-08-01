const handler = {
  apiHome: (req, res) => {
    res.json({
      message: "Welcome to the API",
    });
  },
};

module.exports = handler;
