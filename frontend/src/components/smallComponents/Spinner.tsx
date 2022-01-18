import React from 'react';
import styled, { keyframes } from 'styled-components';

const Spinner = ({ size }: { size?: number }) => {
	return (
		<Loader
			style={
				size
					? { width: `${size}px`, height: `${size}px` }
					: { width: '3rem', height: '3rem' }
			}
		/>
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
	border-radius: 50%;

	font-size: 10px;
	position: relative;
	text-indent: -9999em;
	border: 0.5rem solid rgba(255, 255, 255, 0.2);
	border-left: 0.5rem solid #ffffff;
	animation: ${load} 1.1s infinite linear;
	-webkit-animation: ${load} 1.1s infinite linear;
`;

export default Spinner;
