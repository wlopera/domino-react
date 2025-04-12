// src/components/styled.js
import styled from "styled-components";

// Contenedor del slider
export const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;

// Estilo para el input tipo range
export const SliderInput = styled.input`
  width: 100%;
  max-width: 300px;
  margin-top: 10px;
  -webkit-appearance: none;
  appearance: none;
  height: 5px;
  background: #ddd;
  border-radius: 5px;
  outline: none;

  &:focus {
    background: #bbb;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    background: blueviolet;
    border-radius: 50%;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: #333;
    border-radius: 50%;
    cursor: pointer;
  }
`;
