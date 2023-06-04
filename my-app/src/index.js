import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";
import {  ProductsContext,ProductsProvider } from "./context/ProductsContext";

export {ProductsProvider,ProductsContext}
// Call make Server
makeServer();

ReactDOM.render(
  <ProductsProvider>
  <Router>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Router>
  </ProductsProvider>,
  document.getElementById("root")
);
