// src/components/DominoPiece.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./DominoPiece.css"; // Importamos el archivo de estilo

const DominoPiece = ({ number1, number2, x, y, rotation }) => {
  // Determinamos el nombre de la imagen basado en los números de la ficha
  const getTileImageName = (n1, n2) => {
    const [min, max] = [Math.min(n1, n2), Math.max(n1, n2)];
    return `${max}${min}.png`;
  };

  const imageName = getTileImageName(number1, number2);

  // Usamos ref para obtener las dimensiones reales de la imagen
  const imgRef = useRef(null);
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
      className="tile" // Usamos la clase CSS para los estilos
      style={{
        top: `${y}px`, // Usamos los valores dinámicos pasados como propiedades
        left: `${x}px`,
        transform: `rotate(${rotation}deg)`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <img
        ref={imgRef} // Asignamos la referencia para obtener el tamaño
        src={`/tiles/${imageName}`}
        alt={`Domino ${number1}|${number2}`}
        style={{ width: "100%", height: "100%" }}
      />
    </motion.div>
  );
};

export default DominoPiece;
