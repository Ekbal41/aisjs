const handler = {
  home: (req, res, { eAuth }) => {
    const decodedToken = eAuth.getDecodedToken("secret");
    const title = "Enova Notes";
    res.render("features/root/views/home.html", {
      title,
      feedback: req.feedback,
      user: decodedToken.data,
    });
  },
};

module.exports = handler;
