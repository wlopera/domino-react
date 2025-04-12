import React from "react";

const GameBoard = ({ boardState }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      {boardState.map((item, index) => (
        <div key={index} style={{ margin: "10px", textAlign: "center" }}>
          <div>{item.ficha}</div>
          <div>{item.posicion}</div>
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
