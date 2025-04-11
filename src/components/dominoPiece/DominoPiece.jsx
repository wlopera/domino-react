// src/components/DominoPiece.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./DominoPiece.css";

const DominoPiece = ({ number1, number2, x, y, rotation }) => {
  const getTileImageName = (n1, n2) => {
    const [min, max] = [Math.min(n1, n2), Math.max(n1, n2)];
    return `${max}${min}.png`;
  };
  const imgRef = useRef(null);

  const imageName = getTileImageName(number1, number2);

  // Usamos ref para obtener las dimensiones reales de la imagen
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (imgRef.current) {
      setImageDimensions({
        width: imgRef.current.offsetWidth,
        height: imgRef.current.offsetHeight,
      });
    }
  }, [imgRef]);

  console.log(123, imageName, rotation, imageDimensions, x, y);

  return (
    <motion.div
      className="tile"
      style={{
        top: `${y}px`,
        left: `${x}px`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <img
        ref={imgRef}
        src={`/tiles/${imageName}`}
        alt={`Domino ${number1}|${number2}`}
        style={{ width: "100%", height: "100%" }}
      />
    </motion.div>
  );
};

export default DominoPiece;
