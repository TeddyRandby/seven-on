import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import fire from "../fire";
import Players from "./Players";
import CreateTeam from "./CreateTeam";

function Main(props) {
  const [teams, setTeams] = useState([]);
  const [team, setTeam] = useState({ teamName: "", players: ["none"] });
  const [home, setHome] = useState({ teamName: "", players: ["none"] });
  const [away, setAway] = useState({ teamName: "", players: ["none"] });
  const [selectedPlayers, setSelectedPlayers] = useState([{}])
  const [addingTeam, setAddingTeam] = useState(false);
  const [playersLoading, setPlayersLoading] = useState(false);
  const [side, setSide] = useState("Away");

  useEffect(() => {
    let teamsRef = fire.database().ref("/teams");
    let homeRef = fire.database().ref("/Home");
    let awayRef = fire.database().ref("/Away");
    setPlayersLoading(true);
    teamsRef.on("value", function(snapshot) {
      let val = convertJSONtoArray(snapshot.val());
      if (val.length > 0) {
        let def = val[0];
        setTeam(def);
        setTeams(val);
      }
      setPlayersLoading(false);
    });

    homeRef.on("value", function(snapshot) {
      let homeTeam = snapshot.val();
      setHome(homeTeam);
    });

    awayRef.on("value", function(snapshot) {
      let awayTeam = snapshot.val();
      setAway(awayTeam);
    });
  }, [setTeams]);

  // Event Handlers
  const onAddTeam = () => {
    setAddingTeam(!addingTeam);
  };

  const onTeamChange = event => {
    const newTeam = teams.find(
      current => current.teamName === event.target.value
    );
    setTeam(newTeam);
    setSelectedPlayers(newTeam.selectedPlayers||["none"])
  };

  const onSideChange = event => {
    if (side === "Home") {
      setSide("Away");
      setTeam(away);
    } else {
      setSide("Home");
      setTeam(home);
    }
  };

  // Helper functions
  const convertJSONtoArray = json => {
    let array = [];
    for (let key in json) {
      array.push(json[key]);
    }
    return array;
  };

  // Rendering functions
  const renderOptions = options => {
    let content = options.map(option => {
      return renderOption(option);
    });
    return content;
  };

  const renderOption = option => {
    return (
      <option key={option.teamName} value={option.teamName}>
        {option.teamName}
      </option>
    );
  };

  const renderLoadingMessage = (loadingToTrack, message) => {
    if (loadingToTrack) {
      return (
        <p className="is-size-3 has-text-centered has-icons-left">
          <span className="icon is-large">
            <FontAwesomeIcon icon="spinner" spin />
          </span>
          {message}
        </p>
      );
    } else {
      return <div></div>;
    }
  };

  const content = addingTeam ? (
    <CreateTeam addTeamHandler={onAddTeam} selectedPlayers={selectedPlayers} />
  ) : (
    <div className="">
      <div className="section">
        <div className="columns">
          <div className="column is-one-third is-offset-one-third">
            <div class="field has-addons">
              <p class="control">
                <button
                  class="button is-light is-primary is-outlined"
                  onClick={onSideChange}
                >
                  {side}
                </button>
              </p>
              <div class="control is-expanded">
                <div class="select is-primary is-fullwidth">
                  <select
                    onChange={onTeamChange}
                    value={team.teamName}
                    disabled={teams.length === 0}
                  >
                    {renderOptions(teams)}
                  </select>
                </div>
              </div>
              <div className="control">
                <button
                  className="button is-primary is-light is-outlined"
                  onClick={onAddTeam}
                >
                  <span className="icon is-small">
                    <FontAwesomeIcon icon="plus" />
                  </span>
                </button>
              </div>
            </div>
            {renderLoadingMessage(playersLoading, "Loading players...")}
            <Players team={team} side={side} loading={playersLoading} />
            {teams.length === 0 && !playersLoading ? (
              <p className="help is-danger">
                Looks like there aren't any teams. Add a few by clicking one of
                the plus icons above.
              </p>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return content;
}

export default Main;
