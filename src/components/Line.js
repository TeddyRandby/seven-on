import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import fire from "../fire";

function Line(props) {
  const [players, setPlayers] = useState([]);

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
      if (!snapshot.val()) {
        setPlayers([]);
      } else {
        let val = convertJSONtoArray(snapshot.val().players);
        setPlayers(val);
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
            <div className="">
              {players.length===0? <article class="message is-warning">
            <div class="message-body">
              Looks like there aren't any players on the line yet.
            </div>
          </article>:
              <table className="table is-striped is-narrow ">
                <tbody> {renderPlayers(players)}</tbody>
              </table>}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Line;
