// src/components/Board.jsx
import React, { useState } from "react";
import DominoPiece from "../dominoPiece/DominoPiece";
import { getNexPiece } from "../../utils/LeftRightDominoLogic";

const Board = () => {
  const TILE_WIDTH = 60;
  const TILE_HEIGHT = 120;

  const [pieces, setPieces] = useState([
    { number1: 6, number2: 6, x: 750, y: 200, rotation: 0 },
  ]);
  const [isDouble, setIsDouble] = useState(true); // Por defecto, la ficha es doble
  const [isLeft, setIsLeft] = useState(false); // Dirección inicial: derecha

  const handleDoublePiece = () => {
    setIsDouble(true);
  };

  const handleMixedPiece = () => {
    setIsDouble(false);
  };

  const handleLeftDirection = () => {
    setIsLeft(true);
  };

  const handleRightDirection = () => {
    setIsLeft(false);
  };

  const handleAddPiece = () => {
    // Determinar la pieza comparando con la más a la izquierda o derecha
    const comparisonPiece = isLeft ? pieces[0] : pieces[pieces.length - 1];

    const newPiece = getNexPiece(
      comparisonPiece,
      isDouble,
      TILE_WIDTH,
      TILE_HEIGHT,
      isLeft
    );

    // Agregar la pieza al inicio si es izquierda, o al final si es derecha
    setPieces(isLeft ? [newPiece, ...pieces] : [...pieces, newPiece]);
  };

  return (
    <div>
      <button onClick={handleDoublePiece}>Doble</button>
      <button onClick={handleMixedPiece}>Mixta</button>
      <button onClick={handleLeftDirection}>Izquierda</button>
      <button onClick={handleRightDirection}>Derecha</button>
      <button onClick={handleAddPiece}>Agregar ficha</button>
      <div style={{ position: "relative", width: "100%", height: "400px" }}>
        {pieces.map((piece, index) => (
          <DominoPiece key={index} {...piece} />
        ))}
      </div>
    </div>
  );
};

export default Board;
