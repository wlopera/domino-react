// src/components/Board.jsx
import React, { useState } from "react";
import DominoPiece from "../dominoPiece/DominoPiece";

const Board = () => {
  const TILE_WIDTH = 60;
  const TILE_HEIGHT = 120;

  const [pieces, setPieces] = useState([
    { number1: 6, number2: 6, x: 300, y: 200, rotation: 0 },
  ]);

  const [lastX, setLastX] = useState(300);
  const [lastY, setLastY] = useState(200);

  const handleAddPiece = () => {
    const last = pieces[pieces.length - 1];
    const lastNumber = last.number2;

    let number1 = lastNumber;
    let number2 = number1 === 6 ? 2 : 2;

    const isDouble = number1 === number2;
    const rotation = isDouble ? 0 : 90;

    // Siempre avanzamos 90px en X independientemente de si es doble o no
    const offsetX = TILE_HEIGHT / 2 + TILE_WIDTH / 2; // Siempre sumamos 90px para la distancia horizontal
    const offsetY = 0; // No cambiamos el eje Y

    const newX = lastX + offsetX;
    const newY = lastY + offsetY;

    const newPiece = {
      number1,
      number2,
      x: newX,
      y: newY,
      rotation,
    };

    setPieces([...pieces, newPiece]);
    setLastX(newX);
    setLastY(newY);
  };

  return (
    <div>
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
