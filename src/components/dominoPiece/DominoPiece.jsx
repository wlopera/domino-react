// src/components/DominoPiece.jsx
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { CONFIG } from "../../constants/DominoConstants";

import "./DominoPiece.css";

/**
 * Componente que representa una ficha de dominó con animación de entrada.
 *
 * Este componente recibe las propiedades de la ficha (números, posición y rotación)
 * y la muestra de manera animada en el tablero de dominó.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {number} props.number1 - Primer número de la ficha de dominó (0-6).
 * @param {number} props.number2 - Segundo número de la ficha de dominó (0-6).
 * @param {number} props.x - Posición en el eje X en píxeles donde se debe renderizar la ficha.
 * @param {number} props.y - Posición en el eje Y en píxeles donde se debe renderizar la ficha.
 * @param {number} props.rotation - Rotación de la ficha en grados. Generalmente 0 o 90.
 *
 * @returns {JSX.Element} Ficha de dominó animada y posicionada según las propiedades.
 *
 * @example
 * // Ejemplo de uso:
 * <DominoPiece number1={3} number2={5} x={100} y={200} rotation={90} />
 *
 * Este ejemplo renderiza una ficha de dominó con los números 3 y 5, posicionada
 * en las coordenadas (100, 200) y rotada 90 grados.
 */
const DominoPiece = ({ number1, number2, x, y, rotation }) => {
  /**
   * Genera el nombre del archivo de imagen para una ficha de dominó.
   * El nombre de la imagen se genera a partir de los números de la ficha, ordenados
   * de mayor a menor (por ejemplo: "62.png" para la ficha con números 6 y 2).
   *
   * @param {number} n1 - El primer número de la ficha de dominó.
   * @param {number} n2 - El segundo número de la ficha de dominó.
   * @returns {string} El nombre del archivo de imagen (ej. "62.png").
   */
  const getTileImageName = (n1, n2) => {
    const [min, max] = [Math.min(n1, n2), Math.max(n1, n2)];
    return `${max}${min}.png`;
  };

  // Memorización del nombre de la imagen de la ficha.
  const imageName = useMemo(
    () => getTileImageName(number1, number2),
    [number1, number2]
  );

  // Memorización para determinar si la ficha debe ser rotada 180 grados.
  const needs180Rotation = useMemo(() => number1 < number2, [number1, number2]);

  return (
    <motion.div
      className="tile"
      style={{
        top: `${y}px`, // Posición vertical
        left: `${x}px`, // Posición horizontal
        transform: `${CONFIG.CENTER_TRANSFORM} rotate(${rotation}deg)`, // Aplicación de rotación
      }}
      initial={{ opacity: 0 }} // Animación de opacidad inicial
      animate={{ opacity: 1 }} // Animación de opacidad final
      transition={{ duration: CONFIG.TRANSITION_DURATION }} // Duración de la animación
    >
      <img
        src={`${CONFIG.TILE_IMAGE_PATH}/${imageName}`} // Ruta de la imagen generada
        alt={`Domino ${number1}|${number2}`} // Descripción de la imagen
        style={{
          width: "100%", // Ajuste de tamaño de la imagen
          height: "100%", // Ajuste de tamaño de la imagen
          transform: needs180Rotation ? "rotate(180deg)" : "none", // Aplicación de rotación si es necesario
        }}
      />
    </motion.div>
  );
};

export default DominoPiece;
