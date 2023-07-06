import { Provider } from "react-redux";
import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import store from "./store";
import Desktop from "./components/desktop/Desktop";
import Error404 from "./components/notFound/error404";

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
                <Route exact path='/'>
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
