import React from "react";
import styled, { keyframes } from "styled-components";

const Spinner = ({ size }: { size?: number }) => {
  return (
    <Loader>
      <div
        style={
          size
            ? { width: `${size}px`, height: `${size}px` }
            : { width: "3rem", height: "3rem" }
        }
      ></div>
    </Loader>
  );
};
const load = keyframes`
  0% {
		-webkit-transform: rotate(0deg);
		transform: rotate(0deg);
	}
	100% {
		-webkit-transform: rotate(360deg);
		transform: rotate(360deg);
	}`;

const Loader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  div {
    border-radius: 50%;
    text-indent: -9999em;
    border: 5px solid #d3cccc;
    border-left: 5px solid #e55136;
    animation: ${load} 1.1s infinite linear;
    -webkit-animation: ${load} 1.1s infinite linear;
  }
`;

export default Spinner;
