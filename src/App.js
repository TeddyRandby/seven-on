import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Main from "./components/Main";
import Line from "./components/Line";

function App() {
  return (
    <Router>
      <div className="app">
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/Away" component={Line} />
        <Route exact path="/Home" component={Line} />
      </div>
    </Router>
  );
}

export default App;
