import React from 'react';
import CreateTeam from './components/CreateTeam'
import Footer from './components/Footer'

/*
  Database:
    Team:
      - TeamName (String)
      - Player ({String, Number})
      - Players ( [Player] )


  App:
    Form for adding teams
    Page for selecting teams
      -Render each player w checkbox
      -Render the line in a fixed and styled table.

    Components:
      -NewTeamPage
      -Render team
      -Player
      -Player Table
      -Render player
*/

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <CreateTeam/>
        <Footer/>
      </React.Fragment>
      
    </div>
  );
}

export default App;
