import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IUser } from '../../app/slices/user';
import {
	AiOutlineLogout,
	AiOutlineLogin,
	AiOutlineUser,
	AiOutlinePlus,
} from 'react-icons/ai';
import { FaRegListAlt } from 'react-icons/fa';
import { MdOutlineDashboard } from 'react-icons/md';
import { useLogOutUserMutation } from '../../app/sevices/user';

const UserOptions = ({ user }: { user: IUser | null }) => {
	const [open, setOpen] = useState(false);

	const navigate = useNavigate();

	const [logoutUser, { isLoading: loadingUser, error: loadError }] =
		useLogOutUserMutation();

	const dashBoard = () => {
		setOpen(false);
		navigate('/dashboard');
	};
	const account = () => {
		setOpen(false);
		navigate('/account');
	};
	const orders = () => {
		setOpen(false);
		navigate('/orders');
	};
	const login = () => {
		setOpen(false);
		navigate('/login');
	};
	const logOut = () => {
		setOpen(false);
		logoutUser();
		navigate('/');
	};
	return (
		<Dial>
			<button type="button" onClick={() => setOpen(!open)}>
				{user ? (
					<img src={user.profilePic.url} alt="user" />
				) : (
					<AiOutlinePlus size={24} />
				)}
			</button>
			{user ? (
				<Fragment>
					{user.role === 'admin' && (
						<div
							onClick={dashBoard}
							style={open ? { transform: 'scale(100%)' } : { transform: 'scale(0%)' }}
						>
							<MdOutlineDashboard size={24} />
						</div>
					)}
					<div
						onClick={orders}
						style={open ? { transform: 'scale(100%)' } : { transform: 'scale(0%)' }}
					>
						<FaRegListAlt size={24} />
					</div>
					<div
						onClick={account}
						style={open ? { transform: 'scale(100%)' } : { transform: 'scale(0%)' }}
					>
						<AiOutlineUser size={24} />
					</div>
					<div
						onClick={logOut}
						style={open ? { transform: 'scale(100%)' } : { transform: 'scale(0%)' }}
					>
						<AiOutlineLogout size={24} />
					</div>
				</Fragment>
			) : (
				<div
					onClick={login}
					style={open ? { transform: 'scale(100%)' } : { transform: 'scale(0%)' }}
				>
					<AiOutlineLogin size={24} />
				</div>
			)}
		</Dial>
	);
};

const Dial = styled.div`
	position: absolute;
	right: 2vh;
	top: 12vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
	z-index: 10;
	button {
		background-color: #ebedf1;
		border-radius: 50%;
		height: 50px;
		width: 50px;
		padding: 0;
		&:hover {
			box-shadow: 0 0 10px 1px grey;
		}
		img {
			border-radius: 50%;
			height: 50px;
			width: 50px;
			overflow: hidden;
			object-fit: cover;
		}
	}
	div {
		transition: transform 0.2s;
		cursor: pointer;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		&:hover {
			box-shadow: 0 0 10px 1px grey;
		}
		&:nth-child(2) {
			transition-delay: 100ms;
		}
		&:nth-child(3) {
			transition-delay: 200ms;
		}
		&:nth-child(4) {
			transition-delay: 300ms;
		}
	}
`;

export default UserOptions;
