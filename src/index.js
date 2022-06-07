import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./containers/App";
import reportWebVitals from "./reportWebVitals";
import { ApolloProvider } from "@apollo/client";
import client from "./config/client";

// if (process.env.REACT_APP_API_MOCKING === "enabled") {
//   const { worker } = require("./mocks/browser");
//   worker.start();
// }

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
