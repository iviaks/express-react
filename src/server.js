const express = require("express");
const bodyParser = require("body-parser");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
let app = express.Router();

let production = process.env.NODE_ENV === "production";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.static = (component, layoutProps) => {
    let props = Object.assign(
      {},
      { originalUrl: req.originalUrl, user: req.user },
      layoutProps
    );

    const Layout = React.createElement(
      require("Scripts/containers/Layout"),
      props,
      component
    );
    let html = ReactDOMServer.renderToStaticMarkup(Layout);
    res.send("<!doctype html>" + html);
  };
  next();
});

app.get("/", (req, res) => {
  const Index = React.createElement(require("Scripts/pages/Index"));
  res.static(Index, {
    title: "Test index page"
  });
});

module.exports = app;
