import React, { useState } from "react";
import DominoPiece from "../dominoPiece/DominoPiece";
import { getNextPiece } from "../../utils/LeftRightDominoLogic";
import {
  INITIAL_POSITION,
  BOARD_HEIGHT,
  BOARD_WIDTH,
  SIZES,
} from "../../constants/DominoConstants";

/**
 * Componente que representa el tablero de dominó, donde las piezas son agregadas
 * y mostradas en función de los parámetros configurados por el usuario.
 *
 * @component
 *
 * @returns {JSX.Element} Componente que muestra el tablero de dominó y permite agregar piezas.
 */
const Board = () => {
  const [pieces, setPieces] = useState([
    // Estado que mantiene las piezas de dominó en el tablero
    {
      number1: 6,
      number2: 6,
      x: INITIAL_POSITION.x,
      y: INITIAL_POSITION.y,
      rotation: 0,
    },
  ]);

  const [isDouble, setIsDouble] = useState(true); // Estado que define si la ficha es doble
  const [isLeft, setIsLeft] = useState(false); // Estado que define si las fichas se agregan a la izquierda
  const [scale, setScale] = useState(SIZES.SCALE); // Estado que define el factor de escala de las piezas

  /**
   * Maneja la adición de una nueva ficha al tablero.
   * Se obtiene una ficha según la pieza de comparación y la dirección (izquierda/derecha).
   *
   * @returns {void}
   */
  const handleAddPiece = () => {
    const comparisonPiece = isLeft ? pieces[0] : pieces[pieces.length - 1];
    const newPiece = getNextPiece(comparisonPiece, isDouble, isLeft);
    setPieces(isLeft ? [newPiece, ...pieces] : [...pieces, newPiece]);
  };

  return (
    <div>
      {/* Botones para controlar las reglas del juego */}
      <button onClick={() => setIsDouble(true)}>Doble</button>
      <button onClick={() => setIsDouble(false)}>Mixta</button>
      <button onClick={() => setIsLeft(true)}>Izquierda</button>
      <button onClick={() => setIsLeft(false)}>Derecha</button>
      <button onClick={handleAddPiece}>Agregar ficha</button>

      {/* Control deslizante para cambiar la escala */}
      <div>
        <label>Escala: {scale}</label>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.05"
          value={scale}
          onChange={(e) => setScale(parseFloat(e.target.value))} // Actualiza el estado de la escala
        />
      </div>

      <div
        style={{
          position: "relative",
          width: BOARD_WIDTH,
          height: BOARD_HEIGHT,
        }}
      >
        {/* Renderiza las piezas en el tablero */}
        {pieces.map((piece, index) => (
          <DominoPiece key={index} {...piece} scale={scale} />
        ))}
      </div>
    </div>
  );
};

export default Board;
