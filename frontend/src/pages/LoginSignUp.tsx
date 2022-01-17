import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../components/form/Input';
import { AiOutlineMail } from 'react-icons/ai';
import InputPassword from '../components/form/InputPassword';

const LoginSignUp = () => {
	const [loginBox, setLoginBox] = useState(true);
	const [emailRegister, setEmailRegister] = useState('');
	const [emailLogin, setEmailLogin] = useState('');
	const [passwordRegister, setPasswordRegister] = useState('');
	const [passwordRegisterConfirm, setPasswordRegisterConfirm] = useState('');
	const [passwordLogin, setPasswordLogin] = useState('');

	const loginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};
	const registerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};
	return (
		<SignUpLoginBox>
			<SignUpLoginSwitch>
				<button
					onClick={() => setLoginBox(true)}
					style={loginBox ? { borderBottomColor: 'red' } : {}}
				>
					LOGIN
				</button>
				<button
					onClick={() => setLoginBox(false)}
					style={!loginBox ? { borderBottomColor: 'red' } : {}}
				>
					SIGN UP
				</button>
			</SignUpLoginSwitch>
			<FormArea style={{ transform: `translateX(-${loginBox ? 0 : 100}%)` }}>
				<SignUpLoginForm onSubmit={(e) => loginSubmit(e)}>
					<Input
						placeholder="Email"
						isValid={{ status: true, recived: false }}
						state={emailLogin}
						setState={setEmailLogin}
						icon={<AiOutlineMail size={24} />}
					/>
					<InputPassword
						isValid={{ status: true, recived: false }}
						state={passwordLogin}
						setState={setPasswordLogin}
					/>
					<ActionButton type="submit">LOGIN</ActionButton>
				</SignUpLoginForm>
				<SignUpLoginForm onSubmit={(e) => registerSubmit(e)}>
					<Input
						placeholder="Email"
						isValid={{ status: true, recived: false }}
						state={emailRegister}
						setState={setEmailRegister}
						icon={<AiOutlineMail size={24} />}
					/>
					<InputPassword
						isValid={{ status: true, recived: false }}
						state={passwordRegister}
						setState={setPasswordRegister}
					/>
					<InputPassword
						isValid={{ status: true, recived: false }}
						state={passwordRegisterConfirm}
						setState={setPasswordRegisterConfirm}
						placeholder="Confirm Password"
					/>
					<ActionButton type="submit">REGISTER</ActionButton>
				</SignUpLoginForm>
			</FormArea>
		</SignUpLoginBox>
	);
};

const SignUpLoginBox = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	padding: 1rem;
	max-width: 400px;
	margin: auto;
	overflow: hidden;
`;
const FormArea = styled.div`
	display: flex;
	min-width: 100%;
	transition: 0.7s;
`;
const SignUpLoginForm = styled.form`
	height: 100%;
	min-width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;
const SignUpLoginSwitch = styled.div`
	button {
		font: 300 1.5rem 'Roboto';
		transition: 0.3s;
		margin-bottom: 1rem;
		border: 2px solid transparent;
		&:hover {
			color: tomato;
		}
	}
`;

const ActionButton = styled.button`
	background-color: tomato;
	border-radius: 5px;

	padding: 0.5rem 1.5rem;
`;
export default LoginSignUp;
