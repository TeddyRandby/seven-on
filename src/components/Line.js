import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import fire from "../fire";

function Line(props) {
  const [selectedPlayers, setSelectedPlayers] = useState(["none"])
  const [teamName, setTeamName] = useState("")

  const convertJSONtoArray = json => {
    let array = [];
    for (let key in json) {
      array.push(json[key]);
    }
    return array;
  };

  useEffect(() => {
    let path = props.location.pathname;
    let teamsRef = fire.database().ref(path);
    teamsRef.on("value", function(snapshot) {
      if (snapshot.val()) {
        let players = convertJSONtoArray(snapshot.val().selectedPlayers);
        setSelectedPlayers(players);
        setTeamName(snapshot.val().teamName)
      }
    });
  }, []);

  const renderPlayers = players => {
    if (!players) {
      return <div></div>;
    }
    let content = players.map(player => {
      return renderPlayer(player);
    });
    return content;
  };

  const renderPlayer = player => {
    return (
      <tr>
        <th>{player.number}</th>
        <td>{player.given}</td>
        <td>{player.family}</td>
      </tr>
    );
  };

  return (
    <div>
      <div className="section">
        <div className="columns">
          <div className="column is-one-third is-offset-one-third">
            <p className="subtitle is-4">{teamName}</p>
            <div className="">
              {selectedPlayers.length===0 || selectedPlayers[0] === "none" ? <article class="message is-warning">
            <div class="message-body">
              Looks like there aren't any players on the line yet.
            </div>
          </article>:
              <table className="table is-striped is-narrow is-bordered ">
                <tbody>{renderPlayers(selectedPlayers)}</tbody>
              </table>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Line;
