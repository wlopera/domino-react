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
  const [isDouble, setIsDouble] = useState(true); // Por defecto, la ficha es doble

  const handleDoublePiece = () => {
    setIsDouble(true);
  };

  const handleMixedPiece = () => {
    setIsDouble(false);
  };

  const generateDoublePiece = () => {
    const last = pieces[pieces.length - 1];
    const lastNumber = last.number2;

    const number1 = lastNumber;
    const number2 = lastNumber; // Ficha doble: mismo número en ambos lados
    const rotation = 0; // No rotada

    let offsetX = TILE_HEIGHT / 2 + TILE_WIDTH / 2; // Usamos 90px de distancia por defecto
    if (!isDouble && pieces[pieces.length - 1].rotation === 90) {
      // Si la ficha anterior también es mixta (rotación 90 grados), sumamos 120px
      offsetX = TILE_HEIGHT; // 120px en este caso
    }

    const newX = lastX + offsetX;
    const newY = lastY + 0; // El eje Y no cambia

    return { number1, number2, x: newX, y: newY, rotation };
  };

  const generateMixedPiece = () => {
    const last = pieces[pieces.length - 1];
    console.log(111, last);
    const lastNumber = last.number2; // Aquí tomamos el número de la parte derecha de la ficha anterior

    let number1, number2;

    // Si la ficha anterior es doble o está en rotación 0 (horizontal)
    if (isDouble || last.rotation === 0) {
      number1 = lastNumber;
      number2 = Math.floor(Math.random() * 5) + 1; // Escoge un número entre 1 y 5 para la parte mixta
      if (number2 === lastNumber) {
        number2 = Math.floor(Math.random() * 5) + 1; // Aseguramos que el número no sea igual al anterior
      }
    } else {
      // Si la ficha anterior es mixta, no puede repetir el número
      number1 = lastNumber;
      number2 = Math.floor(Math.random() * 5) + 1; // Escoge un número entre 1 y 5 para la parte mixta
      if (number2 === lastNumber) {
        number2 = Math.floor(Math.random() * 5) + 1; // Aseguramos que el número no sea igual al anterior
      }
    }

    // **Rotación para las fichas mixtas**:
    let rotation = 90; // Si el número más grande está a la derecha, rota 90
    if (lastNumber !== number1) {
      rotation = 270; // Si el número a la derecha es menor, rotamos 270°
    }

    // **Cálculo de offsetX basado en el tipo de ficha anterior**:
    let offsetX;
    if (last.rotation === 0) {
      // Si la ficha anterior es doble o está en posición horizontal (sin rotación)
      offsetX = TILE_HEIGHT / 2 + TILE_WIDTH / 2; // Usamos la distancia por defecto
    } else {
      // Si la ficha anterior es mixta y está rotada (posiblemente 90° o 270°)
      offsetX = TILE_HEIGHT; // Usamos el ancho de la ficha cuando la ficha anterior está rotada
    }

    // **Ajuste del eje X para las nuevas coordenadas**:
    const newX = lastX + offsetX;
    const newY = lastY; // El eje Y no cambia

    return { number1, number2, x: newX, y: newY, rotation };
  };

  const handleAddPiece = () => {
    let newPiece;
    if (isDouble) {
      newPiece = generateDoublePiece();
    } else {
      newPiece = generateMixedPiece();
    }

    setPieces([...pieces, newPiece]);
    setLastX(newPiece.x);
    setLastY(newPiece.y);
  };

  return (
    <div>
      <button onClick={handleDoublePiece}>Doble</button>
      <button onClick={handleMixedPiece}>Mixta</button>
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
