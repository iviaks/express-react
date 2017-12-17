import "babel-polyfill";
import React from "react";
import ReactDOMServer from "react-dom/server";

import express from "express";
import bodyParser from "body-parser";
let app = express.Router();

import LayoutComponent from "Scripts/containers/Layout";
import IndexComponent from "Scripts/pages/Index";

import ApolloClient from "Scripts/utils/apollo/client";
import gql from "graphql-tag";

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

    const Layout = React.createElement(LayoutComponent, props, component);
    res.send("<!doctype html>" + ReactDOMServer.renderToStaticMarkup(Layout));
  };
  next();
});

app.get("/", async (req, res) => {
  const IndexQuery = gql`
    {
      users {
        edges {
          node {
            email
          }
        }
      }
    }
  `;

  const IndexProps = await ApolloClient.query({ query: IndexQuery });

  const Index = React.createElement(IndexComponent, IndexProps);
  res.static(Index, {
    title: "Test index page"
  });
});

module.exports = app;
