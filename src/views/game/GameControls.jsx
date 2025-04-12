import React, { useState } from "react";
import styled from "styled-components";

const Button = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px 20px;
  margin: 8px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #45a049;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const SliderInput = styled.input`
  width: 100%;
  margin-top: 10px;
`;

const GameControls = ({ onAction }) => {
  const [scale, setScale] = useState(1); // Estado para manejar la escala

  return (
    <ButtonContainer>
      <Button onClick={() => onAction("Double1→")}>Doble 1 →</Button>
      <Button onClick={() => onAction("Mix1 →")}>Mix 1 →</Button>
      <Button onClick={() => onAction("Rama 1 ↑")}>Rama 1 ↑</Button>
      <Button onClick={() => onAction("Rama 1 ←")}>Rama 1 ←</Button>
      <Button onClick={() => onAction("Double2 ←")}>Doble 2 ←</Button>
      <Button onClick={() => onAction("Mix2 ←")}>Mix 2 ←</Button>
      <Button onClick={() => onAction("Rama 2 →")}>Rama 2 →</Button>
      <SliderInput
        type="range"
        min="0.5"
        max="2"
        step="0.05"
        value={scale}
        onChange={(e) => setScale(parseFloat(e.target.value))}
      />
    </ButtonContainer>
  );
};

export default GameControls;
