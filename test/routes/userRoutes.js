const userRoutes = [
  {
    method: "GET",
    path: "/",
    callback: (req, res) => {
      res.render("./views/welcome.html", {
        title: "Welcome to Aiszo",
        message: "Welcome to Aiszo",
        version: "1.0.0",
      });
    },
  },
  {
    method: "GET",
    path: "/test",
    callback: (req, res) => {
      res.render("./views/welcome.html", {
        title: "Welcome to test page",
        message: "Welcome to test page",
        version: "1.0.0",
      });
    },
  },
  {
    method: "GET",
    path: "/test/:name1",
    callback: (req, res) => {
      const { name1 } = req.params;
      res.end(`Hello ${name1}!`);
    },
  },
  {
    method: "GET",
    path: "/test/:name1/:name2",
    callback: (req, res) => {
      const { name1, name2 } = req.params;
      res.end(`Hello ${name1}! and ${name2}`);
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
