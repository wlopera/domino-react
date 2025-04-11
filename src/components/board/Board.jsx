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

  const [isDouble, setIsDouble] = useState(false); // Para controlar si la ficha será un doble o no

  // Función para generar una nueva ficha
  const handleAddPiece = () => {
    const last = pieces[pieces.length - 1];
    const lastNumber = last.number2;

    // Generamos números al azar para la nueva ficha
    let number1 = lastNumber;
    let number2 = Math.floor(Math.random() * 7); // Número aleatorio entre 0 y 6

    // Si es un doble (misma cantidad en ambos lados), la rotación será 0, si no, será 90 grados
    const rotation = isDouble ? 0 : 90;

    // Lógica para ajustar el avance en X según si la ficha anterior es mixta o no
    let offsetX = TILE_HEIGHT / 2 + TILE_WIDTH / 2; // Usamos 90px de distancia por defecto

    if (!isDouble && pieces[pieces.length - 1].rotation === 90) {
      // Si la ficha anterior también es mixta (rotación 90 grados), sumamos 120px
      offsetX = TILE_HEIGHT;
    }

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
      <button onClick={() => setIsDouble(true)}>Ficha Doble</button>
      <button onClick={() => setIsDouble(false)}>Ficha Mixta</button>
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
