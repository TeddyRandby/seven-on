import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import fire from "../fire";
import Players from "./Players";
import Footer from "./Footer";
import CreateTeam from "./CreateTeam";

function Main(props) {
  const [teams, setTeams] = useState([]);
  const [home, setHome] = useState({teamName:"",players:[]});
  const [away, setAway] = useState({teamName:"",players:[]});
  const [addingTeam, setAddingTeam] = useState(false);

  const convertJSONtoArray = json => {
    let array = [];
    for (let key in json) {
      array.push(json[key]);
    }

    return array;
  };

  useEffect(() => {
    let teamsRef = fire.database().ref("/teams");
    teamsRef.on("value", function(snapshot) {
      let val = convertJSONtoArray(snapshot.val());
      console.log(val)
      if(val.length>0){
      let def = val[0];
      setHome(def);
      setAway(def);
      setTeams(val);
    } 
    });
  }, [setTeams]);

  const renderOptions = teams => {
    let content = teams.map(team => {
      return renderOption(team);
    });
    return content;
  };

  const renderOption = team => {
    return (
      <option key={team.teamName} value={JSON.stringify(team)}>
        {team.teamName}
      </option>
    );
  };

  const addTeamHandler = () => {
    setAddingTeam(!addingTeam);
  };

  const onHomeTeamChange = event => {
    fire
      .database()
      .ref("home")
      .set({
        players: []
      });
    setHome(JSON.parse(event.target.value));
  };

  const onAwayTeamChange = event => {
    fire
      .database()
      .ref("away")
      .set({
        players: []
      });
    setAway(JSON.parse(event.target.value));
  };

  const content = addingTeam ? (
    <CreateTeam addTeamHandler={addTeamHandler} />
  ) : (
    <div>
      <div className="section">
        <div className="columns">
          <div className="column is-one-third is-offset-one-third">
            <div class="field has-addons">
              <p class="control">
                <a class="button is-static is-light is-primary is-outlined">Home</a>
              </p>
              <div class="control is-expanded">
                <div class="select is-primary is-fullwidth">
                  <select
                    onChange={onHomeTeamChange}
                    value={JSON.stringify(home)}
                    disabled = {teams.length===0}
                  >
                    {renderOptions(teams)}
                  </select>
                </div>
              </div>
              <div className="control">
                <button className="button is-primary is-light is-outlined" onClick={addTeamHandler}>
                  <span className="icon is-small">
                    <FontAwesomeIcon icon="plus" />
                  </span>
                </button>
              </div>
            </div>

            <Players
              players={home.players}
              onSelectedChange={props.onHomeChange}
            />

            <div class="field has-addons">
              <p class="control">
                <a class="button is-static is-primary is-light is-outlined">Away</a>
              </p>
              <div class="control is-expanded">
                <div class="select is-primary is-fullwidth">
                  <select
                    onChange={onAwayTeamChange}
                    value={JSON.stringify(away)}
                    disabled = {teams.length===0}
                  >
                    {renderOptions(teams)}
                  </select>
                </div>
              </div>
              <div className="control">
                <button className="button is-primary is-light is-outlined" onClick={addTeamHandler}>
                  <span className="icon is-small">
                    <FontAwesomeIcon icon="plus" />
                  </span>
                </button>
              </div>
            </div>
            {teams.length ===0?<p className="help is-danger">
              Looks like there aren't any times. Add a few by clicking one of the plus icons above.
            </p>:<div></div>}
            
            <Players
              players={away.players}
              onSelectedChange={props.onAwayChange}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );

  return content;
}

export default Main;
