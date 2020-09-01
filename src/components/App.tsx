import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Login";
import Flight from "./Flight";
import io from "socket.io-client";
import "../index.css";
import Authenticate from "./Authenticate";

// const socket = io(process.env.REACT_APP_NODE_API);

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Authenticate>
          <Route path="/" exact component={Flight} />
        </Authenticate>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
