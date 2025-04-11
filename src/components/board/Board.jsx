// src/components/Board.jsx
import React, { useState } from "react";
import DominoPiece from "../dominoPiece/DominoPiece";

const Board = () => {
  const [pieces, setPieces] = useState([
    { number1: 6, number2: 6, x: 300, y: 200, rotation: 0 },
  ]);

  const [lastX, setLastX] = useState(300 + 40); // La posición inicial del eje X (40px para la ficha inicial vertical)
  const [lastY, setLastY] = useState(200); // La posición fija en Y

  const handleAddPiece = () => {
    const last = pieces[pieces.length - 1];
    const lastNumber = last.number2;

    let number1 = lastNumber;
    let number2 = 2; // fijo para este ejemplo

    const isDouble = number1 === number2;
    const rotation = isDouble ? 0 : 90;

    const newX = lastX;
    const newY = lastY;

    const newPiece = {
      number1,
      number2,
      x: newX,
      y: newY,
      rotation,
    };

    // Actualizar X para siguiente ficha
    if (isDouble) {
      setLastX(lastX + 60); // vertical
    } else {
      setLastX(lastX + 120); // horizontal
    }

    setPieces([...pieces, newPiece]);
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
