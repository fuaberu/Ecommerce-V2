import React from 'react';
import styled from 'styled-components';

export interface InputInterface {
	placeholder: string;
	setState: (arg0: string) => void;
	state: string;
	icon: JSX.Element;
	isValid: { recived: boolean; status: boolean };
}

const Input = ({ placeholder, setState, state, icon, isValid }: InputInterface) => {
	return (
		<div style={{ position: 'relative', marginBottom: '1rem' }}>
			<IconContainer>{icon}</IconContainer>
			<InputContainer
				type="text"
				style={
					isValid.recived
						? isValid.status === true
							? { borderColor: 'green' }
							: { borderColor: 'red' }
						: {}
				}
				placeholder={placeholder}
				onChange={(text) => setState(text.target.value)}
				value={state}
				autoCapitalize="none"
			/>
		</div>
	);
};

export const InputContainer = styled.input`
	height: 28px;
	padding-left: 40px;
	padding-right: 24px;
	outline: none;
	border: 1px solid black;
	border-radius: 5px;
`;
export const IconContainer = styled.div`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	left: 8px;
	display: flex;
	align-items: center;
`;

export default Input;
