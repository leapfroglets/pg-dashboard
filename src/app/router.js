import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import App from "./App";

class Router extends Component {
  constructor() {
    super();
    this.state = {
      isActive: "browse"
    };
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" component={App} />
        </div>
      </BrowserRouter>
    );
  }
}

export default Router;
