import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { CONFIG, SIZES } from "../../constants/DominoConstants";
import styled from "styled-components";

// Definimos el estilo con styled-components
const Tile = styled(motion.div)`
  position: absolute;
  top: ${({ scaledY }) => `${scaledY}px`};
  left: ${({ scaledX }) => `${scaledX}px`};
  width: ${({ scaledWidth }) => `${scaledWidth}px`};
  height: ${({ scaledHeight }) => `${scaledHeight}px`};
  transform: ${({ rotation }) =>
    `${CONFIG.CENTER_TRANSFORM} rotate(${rotation}deg)`};
`;

const TileImage = styled.img`
  width: 100%;
  height: 100%;
  transform: ${({ $needs180Rotation }) =>
    $needs180Rotation ? "rotate(180deg)" : "none"};
`;

const DominoPiece = ({ number1, number2, x, y, rotation, scale }) => {
  const scaledX = x * scale;
  const scaledY = y * scale;
  const scaledWidth = SIZES.TILE_WIDTH * scale;
  const scaledHeight = SIZES.TILE_HEIGHT * scale;

  const getTileImageName = (n1, n2) => {
    const [min, max] = [Math.min(n1, n2), Math.max(n1, n2)];
    return `${max}${min}.png`;
  };

  const imageName = useMemo(
    () => getTileImageName(number1, number2),
    [number1, number2]
  );

  const needs180Rotation = useMemo(() => number1 < number2, [number1, number2]);

  console.log(222, number1, number2, x, y, rotation, scale, imageName);
  return (
    <Tile
      scaledX={scaledX}
      scaledY={scaledY}
      scaledWidth={scaledWidth}
      scaledHeight={scaledHeight}
      rotation={rotation}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: CONFIG.TRANSITION_DURATION }}
    >
      <TileImage
        src={`${CONFIG.TILE_IMAGE_PATH}/${imageName}`}
        alt={`Domino ${number1}|${number2}`}
        $needs180Rotation={needs180Rotation}
      />
    </Tile>
  );
};

export default DominoPiece;
