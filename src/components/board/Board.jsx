// src/components/Board.jsx
import React, { useState } from "react";
import DominoPiece from "../dominoPiece/DominoPiece";
import { getNextPiece } from "../../utils/LeftRightDominoLogic";
import {
  INITIAL_POSITION,
  BOARD_HEIGHT,
  BOARD_WIDTH,
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
  /**
   * Estado que guarda las piezas del dominó en el tablero. Cada pieza es un objeto
   * con las propiedades `number1`, `number2`, `x`, `y`, y `rotation`.
   *
   * @type {Array<Object>}
   */
  const [pieces, setPieces] = useState([
    {
      number1: 6,
      number2: 6,
      x: INITIAL_POSITION.x,
      y: INITIAL_POSITION.y,
      rotation: 0,
    },
  ]);

  /**
   * Estado que determina si las piezas a agregar son dobles o mixtas.
   * Por defecto, es `true` (doble).
   *
   * @type {boolean}
   */
  const [isDouble, setIsDouble] = useState(true);

  /**
   * Estado que determina la dirección en la que se agregan las piezas:
   * `true` para izquierda, `false` para derecha.
   *
   * @type {boolean}
   */
  const [isLeft, setIsLeft] = useState(false);

  /**
   * Función que maneja la lógica para agregar una nueva pieza al tablero.
   * La pieza se agrega a la izquierda o derecha dependiendo del estado `isLeft`.
   * Además, la nueva pieza se genera en base a la última pieza del tablero y
   * al tipo de ficha seleccionada (doble o mixta).
   *
   * @returns {void}
   */
  const handleAddPiece = () => {
    // Determina la pieza de comparación (izquierda o derecha)
    const comparisonPiece = isLeft ? pieces[0] : pieces[pieces.length - 1];

    // Genera una nueva pieza con base en la pieza de comparación, y la configuración de tipo y dirección
    const newPiece = getNextPiece(comparisonPiece, isDouble, isLeft);

    // Agrega la nueva pieza al inicio o al final del tablero
    setPieces(isLeft ? [newPiece, ...pieces] : [...pieces, newPiece]);
  };

  return (
    <div>
      <button onClick={() => setIsDouble(true)}>Doble</button>
      <button onClick={() => setIsDouble(false)}>Mixta</button>
      <button onClick={() => setIsLeft(true)}>Izquierda</button>
      <button onClick={() => setIsLeft(false)}>Derecha</button>
      <button onClick={handleAddPiece}>Agregar ficha</button>
      <div
        style={{
          position: "relative",
          width: BOARD_WIDTH,
          height: BOARD_HEIGHT,
        }}
      >
        {pieces.map((piece, index) => (
          <DominoPiece key={index} {...piece} />
        ))}
      </div>
    </div>
  );
};

export default Board;
