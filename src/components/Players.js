import React, { useState, useEffect } from "react";
import fire from "../fire";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Players(props) {
  const [selectedPlayers, setSelectedPlayers] = useState(["none"]);
  const [players, setPlayers] = useState([]);

  // For these updatings: 0 = idle. 1 = updating. 2 = done updating.
  const [updatingSelected, setUpdatingSelected] = useState(0);

  useEffect(() => {
    if (props.team.players) {
      setPlayers(props.team.players);
    }
  }, [props.team.players]);

  useEffect(() => {
    if(props.selectedPlayers){
    setSelectedPlayers(props.selectedPlayers)
    }
  },[props.selectedPlayers])

  useEffect(() => {
    onSelectedChange(selectedPlayers);
  }, [selectedPlayers]);

  useEffect(() => {
    onTeamChange(props.team);
  }, [props.team]);

  const onSelectedChange = players => {
    setUpdatingSelected(1);
    console.log(players)
    fire
      .database()
      .ref(props.side + "/selectedPlayers")
      .set(players)
      .then(() => setUpdatingSelected(2));
    if (players[0] != ["none"]){
      selectedPlayersTimeout();
    }
    setTimeout(() => setUpdatingSelected(0), 3000);
  };

  const onTeamChange = team => {
    let copy = team;
    copy.selectedPlayers = ["none"]
    fire
      .database()
      .ref(props.side)
      .set(copy);
    setSelectedPlayers(["none"])
  };

  const onSelect = event => {
    let value = JSON.parse(event.currentTarget.value);
    let newSelectedPlayers;

    if (selectedPlayers[0] == "none" && selectedPlayers.length == 1) {
      newSelectedPlayers = [];
    } else {
      newSelectedPlayers = selectedPlayers.slice();
    }

    if (playerInPlayers(value, newSelectedPlayers)) {
      let index = findPlayerIndex(value, newSelectedPlayers);
      if (index !== -1) {
        let rmv = newSelectedPlayers.splice(index, 1);
        if (newSelectedPlayers.length == 0) {
          newSelectedPlayers = ["none"];
        }
        setSelectedPlayers(newSelectedPlayers);
      }
    } else {
      newSelectedPlayers.push(JSON.parse(event.currentTarget.value));
      setSelectedPlayers(newSelectedPlayers);
    }
  };

  const selectedPlayersTimeout = () => {
    setTimeout(() => {
      fire
        .database()
        .ref(props.side + "/selectedPlayers")
        .set(["none"]);
        setSelectedPlayers(["none"])

    }, 90000);
  };

  // Helper Functions
  const findPlayerIndex = (player, players) => {
    let index = players.findIndex(current => {
      return (
        player.given === current.given &&
        player.family === current.family &&
        player.number === current.number
      );
    });
    return index;
  };

  const playerInPlayers = (player, players) => {
    if (players) {
      return players.some(
        current =>
          current.given === player.given &&
          current.family === player.family &&
          current.number === player.number
      );
    }
  };

  // Rendering functions
  const renderPlayers = players => {
    if (players.length < 1 || players[0] === "none" || props.loading) {
      return <div></div>;
    } else {
      let content = players.map(player => {
        return renderPlayer(player);
      });
      return content;
    }
  };

  const renderPlayer = player => {
    let buttonStyles;
    if (playerInPlayers(player, selectedPlayers)) {
      buttonStyles = "button is-fullwidth is-info";
    } else {
      buttonStyles = "button is-fullwidth is-info is-light";
    }
    return (
      <div key={player.number} className="control is-expanded">
        <button
          className={buttonStyles}
          onClick={onSelect}
          value={JSON.stringify(player)}
        >
          {(player.given || "") +
            " " +
            (player.family || "") +
            " " +
            (player.number || "")}
        </button>
      </div>
    );
  };

  const renderUpdateMessage = (updateToTrack, successMessage) => {
    if (updateToTrack === 1) {
      return (
        <div>
          <p className="help is-danger">
            <span className="icon is-small">
              <FontAwesomeIcon icon="spinner" spin />
            </span>
            {"Updating..."}
          </p>
        </div>
      );
    } else if (updateToTrack === 2) {
      return (
        <div>
          <p className="help is-success">
            <span className="icon is-small">
              <FontAwesomeIcon icon="check" />
            </span>
            {successMessage}
          </p>
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  return (
    <div>
      <div className="field">{renderPlayers(players)}</div>
      {renderUpdateMessage(updatingSelected, "Players updated successfully!")}
    </div>
  );
}

export default Players;
