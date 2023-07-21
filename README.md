# Enova - A Simple and Powerful Node.js Web Framework

[![The MIT License](https://img.shields.io/badge/license-MIT-orange.svg?color=blue&style=flat-square)](http://opensource.org/licenses/MIT)

## Table of Contents

- [About](#about)
- [Installation](#installation)
- [Getting Started](#getting-started)
  - [Create a New Enova Project](#create-a-new-enova-project)
  - [Defining Routes](#defining-routes)
  - [Handling Route Parameters and Query Parameters](#handling-route-parameters-and-query-parameters)
  - [Plugin](#plugin)
  - [Middleware](#middleware)
- [Assets](#assets)
- [Templating Engine](#templating-engine)
- [Create an app from scratch](reate-an-app-from-scratch)

## About

Enova is a simple and super easy to use web framework for Node.js. It is designed to help developers create RESTful APIs as well as full-stack web applications. With Enova, you can quickly set up routes, handle HTTP methods, manage route parameters and query parameters, and much more.

## Installation

To install Enova in your project, use npm:

```bash
npm install -g enova
```

## Getting Started

### Create a New Enova Project

After installing Enova, you can quickly generate a new Enova project by running:

```bash
enova init
cd your-project-folder
npm install
npm run dev
```

The development server will start on `http://localhost:8000/`, and you can start developing your project inside the `src` directory.

### Defining Routes

To define routes in your Enova application, you can use the `app.get()`, `app.post()`, `app.put()`, and `app.delete()` methods. For example:

```javascript
app.get("/", (req, res, enova) => {
  res.send("Hello, Enova!");
});

app.post("/login", (req, res, enova) => {
  // Handle login logic
});
```

Here `enova` is an object where you can store functions or other things, Which will be available to the whole application.
Like `matchPassword()` can be available to whole application.

```javascript
app.get("/", (req, res, enova) => {
  enova.matchPassword(pass1, pass1){
    if(pass1 === pass2){
        return true;
    }
    return false;
  }
  res.send("Hello, Enova!");
});


```

### Handling Route Parameters and Query Parameters

Enova allows you to handle route parameters and query parameters in your routes. For route parameters, you can use `req.params`, and for query parameters, you can use `req.query`. For example:

```javascript
app.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  // Do something with userId
});

app.get("/search", (req, res) => {
  const query = req.query.q;
  // Perform search based on query
});
```

### Plugin

Plugins offer a versatile solution for accomplishing various tasks, akin to middleware, but with added flexibility and enhanced capabilities.

```javascript
function pluginOne(ctx) {
  const { self, res } = ctx;
  if (self.currentRoute === "/page") {
    res.error("This error is comming from pluginOne!!");
  }
  // Perform other actions
}
```

It's easy to register a plugin to the app. For single plugin, pass the plugin to `registerPlugins()` function.
For more then one plugin use an array `[plugin1,plugin2]`. Plugins runs in `first to last` order.

```javascript
app.registerPlugins([pluginOne]);
```

### Middleware

Middleware is just a function like Callback, Its runs before the callback function. You cane use it for validation , authentication or othere purpose.

```javascript
function midOne(req, res, enova) {
  console.log("This is from Middleware One");
  // Perform other actions
}
```

To use a Middleware:

````javascript
app.get("/", midOne, (req, res) => {
  res.render("index.ejs", {
    title: "Welcome to Enova",
    message: "This route is using mid1",
  });
});```

### Assets

Default assets folder is "/public", but you can change it as needed:

```javascript
app.register("assetsFolder", {
  path: "your_assets_folder_name",
});
````

### Templating Engine

Enova comes with Nunjucks as the default templating engine, but you can easily switch to other engines such as EJS. To change the templating engine, use the app.register method:

```javascript
app.register("viewEngine", {
  name: "ejs",
  engine: ejs,
  config: {}, // Options for the view engine
});
```

With the templating engine set, you can now use templates in your routes:

```javascript
app.get("/", (req, res) => {
  res.render("index.ejs", {
    title: "Welcome to Enova",
    message: "A lightweight and powerful Node.js framework",
  });
});
```

That's it! You now have a powerful web framework at your disposal to build web applications with ease using Node.js.

Happy coding with Enova!

## Create an app from scratch

```javascript
import Enova from enova

const app = Enova();
const PORT = 3000

// ROUTE PARAMETERS
app.get("/home/:id", (req, res) => {
  console.log("query params", req.query);
  console.log('req.params', req.params);
  res.send("product id");
});

app.get('/home', (req, res) => {
  console.log('query params', req.query)
  res.send('text');
})

// POST
app.post('/home', (req,res) => {
  console.info('body', req.body)
  res.json(req.body);
})

// PUT
app.put('/home', (req,res) => {
  console.info('body', req.body)
  res.json(req.body);
})

// MIDDLEWARE
app.get('/orders', (req, res, next) => {
  if (req.headers['authorization'] === 'Staff') {
    console.log('next', next)
  } else {
    res.statusCode = 401;
    res.send('Not allowed')
  }
}, (req, res) => {
  res.send('Protected route');
})

// Starts listening to requests
app.start(PORT);

```
