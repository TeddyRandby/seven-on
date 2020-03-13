import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Main from "./components/Main";
import Line from "./components/Line";

import fire from "./fire";

/*
  App:
    Page for selecting teams
      -Render each player w checkbox
      -Render the line in a fixed and styled table.

    Components:
      -Player Table
      -Render player
*/

function App() {
  const onHomeChange = players => {
    fire
      .database()
      .ref("home")
      .set({
        players: players
      });
  };

  const onAwayChange = players => {
    fire
      .database()
      .ref("away")
      .set({
        players: players
      });
  };

  return (
    <Router>
      <div className="App">
        <Route exact path="/">
          <Main onHomeChange={onHomeChange} onAwayChange={onAwayChange} />
        </Route>
        <Route path="/away" component={Line} />

        <Route path="/home" component={Line} /> 
      </div>
    </Router>
  );
}

export default App;
