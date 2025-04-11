// src/App.jsx
import React from "react";
import Board from "./components/board/Board";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <h1>Juego de Dominó</h1>
      <Board />
    </div>
  );
};

export default App;
