import React, { useState } from "react";
import styled from "styled-components";
import GameControls from "./GameControls"; // Importar el componente de controles
import DominoPiece from "../../components/dominoPiece/DominoPiece";
import { INITIAL_POSITION, SIZES } from "../../constants/DominoConstants";
import { getNextPiece } from "../../utils/LeftRightDominoLogic";

const GameContainer = () => {
  const [boardState, setBoardState] = useState([
    {
      number1: 6,
      number2: 6,
      x: INITIAL_POSITION.x,
      y: INITIAL_POSITION.y,
      rotation: 0,
    },
  ]);

  const [scale, setScale] = useState(1);

  const addRandomPiece = (type, isLeft = false) => {
    const lastPiece = boardState[boardState.length - 1];

    const isDouble = type === "Doble";

    // Usamos la lógica que ya construiste para generar correctamente la ficha
    const newPiece = getNextPiece(lastPiece, isDouble, isLeft);

    setBoardState((prev) => [...prev, newPiece]);
  };

  const handleAction = (action) => {
    let isLeft = false;
    let isDouble = false;
    let comparisonPiece;

    // Determinar la acción y ajustar las variables
    if (action === "Double1→" || action === "Mix1 →") {
      isLeft = false; // Agregar a la derecha
      comparisonPiece = boardState[boardState.length - 1]; // Tomamos la última ficha
      isDouble = action === "Double1→"; // Verificamos si es ficha doble
    } else if (action === "Double2 ←" || action === "Mix2 ←") {
      isLeft = true; // Agregar a la izquierda
      comparisonPiece = boardState[0]; // Tomamos la primera ficha
      isDouble = action === "Double2 ←"; // Verificamos si es ficha doble
    }

    // Usamos la misma lógica para calcular la nueva pieza
    const newPiece = getNextPiece(comparisonPiece, isDouble, isLeft);

    // Actualizamos el estado de la mesa según la dirección
    setBoardState((prev) =>
      isLeft ? [newPiece, ...prev] : [...prev, newPiece]
    );
  };

  // const handleAction = (action) => {
  //   if (action === "Doble1→") {
  //     addRandomPiece("Doble");
  //   } else if (action === "Mix1 →") {
  //     addRandomPiece("Mix");
  //   } else if (action === "Mix2 ←") {
  //     const lastPiece = boardState[boardState.length - 1];
  //     const isDouble = false;
  //     const isLeft = true;

  //     const newPiece = getNextPiece(lastPiece, isDouble, isLeft);
  //     setBoardState((prev) => [...prev, newPiece]);
  //   } else if (action === "Double2 ←") {
  //     const lastPiece = boardState[boardState.length - 1];
  //     const isDouble = true;
  //     const isLeft = true;

  //     const newPiece = getNextPiece(lastPiece, isDouble, isLeft);
  //     setBoardState((prev) => [...prev, newPiece]);
  //   } else if (action === "Rama 1 →") {
  //     //logica
  //   } else if (action === "Rama 1 ↑") {
  //     // Agregar lógica si es necesario
  //   }
  // };

  return (
    <GameContainerDiv>
      <TopSection>
        <GameControls
          onAction={handleAction}
          scale={scale}
          setScale={setScale}
        />
      </TopSection>
      <LeftSection>
        <div>Chat o Información</div>
      </LeftSection>
      <CenterSection>
        {boardState.map((piece, index) => (
          <DominoPiece key={index} {...piece} scale={scale} />
        ))}
      </CenterSection>
      <RightSection>
        <div>Controles adicionales</div>
      </RightSection>
      <BottomSection>
        <div>Pie de página</div>
      </BottomSection>
    </GameContainerDiv>
  );
};

export default GameContainer;

const GameContainerDiv = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 5fr 0.5fr; // Más espacio horizontal al centro
  grid-template-rows: 0.7fr 5fr 0.7fr; // Más espacio vertical al centro
  grid-template-areas:
    "top top top"
    "left center right"
    "bottom bottom bottom";
  height: 100vh;
  width: 100vw;
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border: 1px solid #ccc;
`;

const TopSection = styled(Section)`
  grid-area: top;
`;

const LeftSection = styled(Section)`
  grid-area: left;
  background-color: #f0f0f0;
`;

const CenterSection = styled(Section)`
  grid-area: center;
  background-color: #e0e0e0;
  height: 100%;
  width: 100%;
  flex-direction: column;
  overflow: auto;
`;

const RightSection = styled(Section)`
  grid-area: right;
  background-color: #f0f0f0;
`;

const BottomSection = styled(Section)`
  grid-area: bottom;
`;
