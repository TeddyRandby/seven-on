import React, { useState, useEffect } from "react";

function Players(props) {
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    if (props.players) {
      setPlayers(props.players);
      setSelectedPlayers([])
    }
  }, [props.players]);

  const onSelect = event => {
    let value = JSON.parse(event.currentTarget.value);
    let newSelectedPlayers = selectedPlayers.slice();
    if (
      newSelectedPlayers.some(
        player =>
          player.given === value.given &&
          player.family === value.family &&
          player.number === value.number
      )
    ) {
      let index = newSelectedPlayers.indexOf(value);
      let rmv = newSelectedPlayers.splice(index, 1);
      setSelectedPlayers(newSelectedPlayers);
      event.target.classList.add("is-light");
    } else {
      newSelectedPlayers.push(JSON.parse(event.currentTarget.value));
      setSelectedPlayers(newSelectedPlayers);
      event.target.classList.remove("is-light");
    }

    props.onSelectedChange(newSelectedPlayers);
  };

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
   
      <div className="control is-expanded">
        <button
          className={"button is-fullwidth is-info is-light"}
          key={player.number}
          onClick={onSelect}
          value={JSON.stringify(player)}
        >
          {player.given + " " + player.family + " " + player.number}
        </button>
      </div>
     
    );
  };

  return <div className="field">{renderPlayers(players)}</div>;
}

export default Players;
