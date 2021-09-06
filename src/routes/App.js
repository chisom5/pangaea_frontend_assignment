import React, { lazy, Suspense, Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Spin} from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { ApolloProvider } from "@apollo/client";
import client from "../config/client";
import "./App.scss";

const Product = lazy(() => import("../containers/product"));

const LoadingMessage = () => (
  <div
    style={{
      background: "#e5eff1",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100%",
    }}
  >
    <div className="spin">
      <Spin
        size="small"
        indicator={
          <LoadingOutlined style={{ fontSize: 24, color: "#00A3A1" }} spin />
        }
      />
    </div>
  </div>
);

class Main extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Suspense fallback={<LoadingMessage />}>
            <Switch>
              <Route exact path="/" component={Product} />
            </Switch>
          </Suspense>
        </Router>
      </ApolloProvider>
    );
  }
}
export default Main;
