import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fire from "../fire";

function CreateTeam(props) {
  const [players, setPlayers] = useState([]);
  const [newPlayerGiven, setNewPlayerGiven] = useState("");
  const [newPlayerFamily, setNewPlayerFamily] = useState("");
  const [newPlayerNumber, setNewPlayerNumber] = useState("");

  const [error, setError] = useState("");
  const [teamName, setTeamName] = useState("");
  const [queryStatus, setQueryStatus] = useState(0);

  const addPlayerHandler = () => {
    setError("");
    let playersCopy = players.slice();
    if (newPlayerGiven.length < 1) {
      setError("Players need given names.");
    } else if (newPlayerFamily.length < 1) {
      setError("Players need family names.");
    } else if (newPlayerNumber.length < 1) {
      setError("Players need numbers.");
    } else {
      let playerToAdd = {};
      playerToAdd.given = newPlayerGiven.replace(" ", "-").toUpperCase();
      playerToAdd.family = newPlayerFamily.replace(" ", "-").toUpperCase();
      playerToAdd.number = newPlayerNumber.replace(" ", "-").toUpperCase();
      playersCopy.push(playerToAdd);
      setNewPlayerGiven("");
      setNewPlayerFamily("");
      setNewPlayerNumber("");
      setPlayers(playersCopy);
    }
  };

  const removePlayerHandler = event => {
    setError("");
    players.forEach(player => {
      if (
        event.currentTarget.classList.contains(
          "" + player.given + player.family
        )
      ) {
        let i = players.indexOf(player);
        let copy = players.slice();
        let removed = copy.splice(i, 1);
        setPlayers(copy);
      }
    });
    console.log(players);
  };

  const renderPlayers = players => {
    let content = players.map(player => {
      return renderPlayer(player);
    });
    return content;
  };

  const renderPlayer = player => {
    let name = "button is-dark is-light " + player.given + player.family;
    return (
      <div className="field has-addons" key={player}>
        <div class="control">
          <input
            class="input"
            type="text"
            defaultValue={player.given}
            disabled
          />
        </div>
        <div class="control">
          <input
            class="input"
            type="text"
            defaultValue={player.family}
            disabled
          />
        </div>
        <div class="control">
          <input
            class="input"
            type="text"
            defaultValue={player.number}
            disabled
          />
        </div>
        <div className="control">
          <button className={name} onClick={removePlayerHandler}>
            <span className="icon is-small has-text-white">
              <FontAwesomeIcon icon="minus" />
            </span>
          </button>
        </div>
      </div>
    );
  };

  const onNewPlayerGivenChange = event => {
    setNewPlayerGiven(event.target.value);
  };

  const onNewPlayerFamilyChange = event => {
    setNewPlayerFamily(event.target.value);
  };

  const onNewPlayerNumberChange = event => {
    setNewPlayerNumber(event.target.value);
  };

  const onTeamNameChange = event => {
    setTeamName(event.target.value);
  };

  const createTeamHandler = () => {
    setError("");
    if (teamName.length < 1) {
      setError("Please name the team.");
    } else if (players.length < 1) {
      setError("Please add players to your team.");
    } else {
      setTeamName(teamName.replace(" ","-").toUpperCase())
      fire
        .database()
        .ref("teams/" + teamName)
        .set({
          players: players,
          name: teamName.replace(" ","-").toUpperCase()
        });
      setQueryStatus(1);
    }
  };

  let pre_query = (
    <div className="section">
      <div className="columns">
        <div className="column is-one-third is-offset-one-third">
          <div>
            <article class="message is-info">
              <div class="message-body">
                Make sure you enter all your players's names here. You won't be
                able to change them, or add any more later. If the team already
                exists, the previous players will be overwritten.
              </div>
            </article>
            <div class="field">
              <div class="control">
                <input
                  class="input is-primary is-medium"
                  type="text"
                  placeholder="Enter a team's name here"
                  onChange={onTeamNameChange}
                />
              </div>
              <p class="help is-info">
                This is how you will find the team later.
              </p>
            </div>
            {renderPlayers(players)}
            <div className="field has-addons">
              <div className="control">
                <button
                  className="button is-primary"
                  onClick={createTeamHandler}
                >
                  <span className="icon is-small">
                    <FontAwesomeIcon icon="cloud-upload-alt" />
                  </span>
                </button>
              </div>
              <div className="control ">
                <input
                  className="input is-primary is-fullwidth"
                  type="text"
                  placeholder="Given Name"
                  onChange={onNewPlayerGivenChange}
                  value={newPlayerGiven}
                />
              </div>
              <div className="control ">
                <input
                  className="input is-primary is-fullwidth"
                  type="text"
                  placeholder="Family Name"
                  onChange={onNewPlayerFamilyChange}
                  value={newPlayerFamily}
                />
              </div>
              <div className="control ">
                <input
                  className="input is-primary is-fullwidth"
                  type="text"
                  placeholder="Number"
                  onChange={onNewPlayerNumberChange}
                  value={newPlayerNumber}
                />
              </div>
              <div className="control">
                <button
                  className="button is-primary"
                  onClick={addPlayerHandler}
                >
                  <span className="icon is-small">
                    <FontAwesomeIcon icon="plus" />
                  </span>
                </button>
              </div>
            </div>
            <p class="help is-info">
              Once you've added all the players, click the cloud icon to upload
              your team.
            </p>
            <p class="help is-danger">{error}</p>
          </div>
        </div>
      </div>
    </div>
  );

  let post_query = (
    <div className="section">
      <div className="columns">
        <div className="column is-one-third is-offset-one-third">
          <article class="message is-info">
            <div class="message-body">Your team was created successfully. Here it is:</div>
          </article>
          <div className="field has-addons" key={teamName}>
            <div class="control is-expanded">
              <input
                class="input is-medium is-fullwidth"
                type="text"
                defaultValue={teamName}
                disabled
              />
            </div>
          </div>
          {renderPlayers(players)}
        </div>
      </div>
    </div>
  );

  switch (queryStatus) {
    case 0:
      return pre_query;
    case 1:
      return post_query;
    default:
      return pre_query;
  }
}

export default CreateTeam;
