// src/components/DominoPiece.jsx
import React from "react";
import { motion } from "framer-motion";
import "./DominoPiece.css";

const DominoPiece = ({ number1, number2, x, y, rotation }) => {
  console.log(222, number1, number2, x, y, rotation);
  const getTileImageName = (n1, n2) => {
    const [min, max] = [Math.min(n1, n2), Math.max(n1, n2)];
    return `${max}${min}.png`;
  };

  const imageName = getTileImageName(number1, number2);

  const needs180Rotation = number1 < number2;

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
        src={`/tiles/${imageName}`}
        alt={`Domino ${number1}|${number2}`}
        style={{
          width: "100%",
          height: "100%",
          transform: needs180Rotation ? "rotate(180deg)" : "none",
        }}
      />
    </motion.div>
  );
};

export default DominoPiece;
