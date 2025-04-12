import React, { useState } from "react";
import DominoPiece from "../dominoPiece/DominoPiece";
import { getNextPiece } from "../../utils/LeftRightDominoLogic";
import {
  INITIAL_POSITION,
  BOARD_HEIGHT,
  BOARD_WIDTH,
  SIZES,
} from "../../constants/DominoConstants";
import styled from "styled-components"; // Importamos styled-components

// Creamos un contenedor para el tablero con styled-components
const BoardContainer = styled.div`
  position: relative;
  width: ${BOARD_WIDTH};
  height: ${BOARD_HEIGHT};
`;

const Button = styled.button`
  margin: 5px;
`;

const SliderWrapper = styled.div`
  margin-top: 15px;
`;

const SliderInput = styled.input`
  width: 100%;
`;

const Board = () => {
  const [pieces, setPieces] = useState([
    {
      number1: 6,
      number2: 6,
      x: INITIAL_POSITION.x,
      y: INITIAL_POSITION.y,
      rotation: 0,
    },
  ]);
  const [isDouble, setIsDouble] = useState(true);
  const [isLeft, setIsLeft] = useState(false);
  const [scale, setScale] = useState(SIZES.SCALE);

  const handleAddPiece = () => {
    const comparisonPiece = isLeft ? pieces[0] : pieces[pieces.length - 1];
    const newPiece = getNextPiece(comparisonPiece, isDouble, isLeft);
    setPieces(isLeft ? [newPiece, ...pieces] : [...pieces, newPiece]);
  };

  return (
    <div>
      <div>
        <Button onClick={() => setIsDouble(true)}>Doble</Button>
        <Button onClick={() => setIsDouble(false)}>Mixta</Button>
        <Button onClick={() => setIsLeft(true)}>Izquierda</Button>
        <Button onClick={() => setIsLeft(false)}>Derecha</Button>
        <Button onClick={handleAddPiece}>Agregar ficha</Button>
      </div>

      <SliderWrapper>
        <label>Escala: {scale}</label>
        <SliderInput
          type="range"
          min="0.5"
          max="2"
          step="0.05"
          value={scale}
          onChange={(e) => setScale(parseFloat(e.target.value))}
        />
      </SliderWrapper>

      <BoardContainer>
        {pieces.map((piece, index) => (
          <DominoPiece key={index} {...piece} scale={scale} />
        ))}
      </BoardContainer>
    </div>
  );
};

export default Board;
