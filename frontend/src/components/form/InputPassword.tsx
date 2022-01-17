import React, { useState } from 'react';
import { IconContainer, InputContainer, InputInterface } from './Input';
import { AiOutlineEye, AiFillLock } from 'react-icons/ai';
import styled from 'styled-components';

interface InputPaswordInterface {
	placeholder?: string;
	setState: (arg0: string) => void;
	state: string;
	isValid: { recived: boolean; status: boolean };
}

const InputPassword = ({
	setState,
	state,
	isValid,
	placeholder,
}: InputPaswordInterface) => {
	const [hide, setHide] = useState(true);
	return (
		<div style={{ position: 'relative', width: 'fit-content', marginBottom: '1rem' }}>
			<IconContainer>{<AiFillLock size={24} />}</IconContainer>
			<IconEyeButton type="button" onClick={() => setHide(!hide)}>
				<AiOutlineEye size={24} />
			</IconEyeButton>
			<InputContainer
				type={hide ? 'password' : 'text'}
				style={
					isValid.recived
						? isValid.status === true
							? { borderColor: 'green' }
							: { borderColor: 'red' }
						: {}
				}
				placeholder={placeholder || 'Password'}
				onChange={(text) => setState(text.target.value)}
				value={state}
				autoCapitalize="none"
			/>
		</div>
	);
};
const IconEyeButton = styled.button`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	padding: 0;
	padding-right: 4px;
	right: 1px;
	background-color: transparent;
	display: flex;
	align-items: center;
`;
export default InputPassword;
