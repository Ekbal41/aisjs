const userRoutes = [
  
  {
    method: "GET",
    path: "/",
    callback: (req, res) => {
      res.render("./views/index.html", {
        title: "Welcome to enova",
        message: "Welcome to enova",
        version: "1.0.0",
      });
    },
  },
  {
    method: "GET",
    path: "/about",
    callback: (req, res) => {
      res.render("./views/about.html", {
        title: "Welcome to test page",
        message: "Welcome to test page",
        version: "1.0.0",
      });
    },
  },
  {
    method: "GET",
    path: "/docs",
    callback: (req, res) => {
      res.render("./views/docs/docs.html", {
        title: "Welcome to test page",
      });
    },
  },
  {
    method: "GET",
    path: "/plugins",
    callback: (req, res) => {
      res.render("./views/plugins/plugins.html", {
        title: "Welcome to test page",
      });
    },
  },
  {
    method: "GET",
    path: "/query",
    callback: (req, res) => {
      const { name, age } = req.query;
      res.end(`Here we have a friend named ${name} and he is ${age} years old`);
    },
  },
];

module.exports = userRoutes;
