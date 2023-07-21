
[![The MIT License](https://img.shields.io/badge/license-MIT-orange.svg?color=blue&style=flat-square)](http://opensource.org/licenses/MIT)

## Table of Contents

- [About](#about)
- [Install](#install)
- [Features](#features)
- [Create an app](#create-an-app)
- [Templating engine](#templating-engine)
- [Assets](#assets)

## About

This is a minimalistic Web framework for Node.js. It helps you create RESTful APIs or full-stack website.

## Install

```bash
npm install enova
```
If want to use enova cli then install it globaly.
```bash
npm install -g enova
```
You can quickly generate a Enova project via via runnin_
```bash
enova init
cd your-project-folder
npm install
npm run dev
```

Development server will start in `http://localhost:8000/` . Now you can start with `src` dir for further development.

## Features

- Create routes supporting `get`, `post`, `put`, `delete` http verbs:

  ```javascript
  app.get("<path>", middlewire, (req, res) => {});
  app.post("<path>", (req, res) => {});
  app.put("<path>", (req, res) => {});
  app.delete("<path>", (req, res) => {});
  ```


- To Handles route parameters and query parameters:

  **Router parameters**

  ```javascript
  app.get("/home/:id/:name", (req, res) => {
    console.log(req.params); // /home/200/papar returns {id : 200, name : papar}
  });
  ```

  **Query parameters**

  ```javascript
  app.get("/home?name=lofar&&age=23", (req, res) => {
    console.log(req.query); // returns { name: "lofar", age: "23"}
  });
  ```

## Assets

- Default asstes folder is "/puplic" , You can change it.

```javascript
 app.register("assetsFolder", {
  path: "your_assets_folder_name",
});
```

## Templating engine

- In default Fais uses Nunjucks as its templating engine. It can be changed too.

```javascript
 app.register("viewEngine", {
  name: "view_engine_name",
  engine: view_emgine,
  config: {}, //options for the view engine
});
```

```javascript
app.get("/", (req, res) => {
  res.render("./example/index.html", {
    title: "Enova Demo Website",
    message: "Welcome to Enova",
  });
});
```

## Create an app

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
