import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Error404 from "./components/notFound/error404";
import Desktop from "./components/desktop/Desktop";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./assets/default.css";

class Router extends Component {
  state = {};
  render() {
    return (
      <>
        <React.StrictMode>
          <Provider store={store}>
            <BrowserRouter>
              <Switch>
                <Route exact path="/">
                  <Desktop />
                </Route>
                <Route component={Error404}></Route>
              </Switch>
            </BrowserRouter>
          </Provider>
        </React.StrictMode>
      </>
    );
  }
}

export default Router;
