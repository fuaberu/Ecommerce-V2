import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '../../app/store';
import UserOptions from './UserOptions';

const Navbar = () => {
	const [open, setOpen] = useState(false);
	const [pageWidth, setPageWidth] = useState<number>(window.innerWidth);

	const { user } = useSelector((state: RootState) => state.user);

	useEffect(() => {
		function handleResize() {
			setPageWidth(window.innerWidth);
		}

		window.addEventListener('resize', handleResize);

		console.log(pageWidth);
		return () => window.removeEventListener('resize', handleResize);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const menuConfig = {
		size: 40,
	};
	return (
		<Container
			style={open && pageWidth < 768 ? { height: '100vh' } : { transitionDelay: '0.5s' }}
		>
			<Div>
				<BurgerIcon
					style={{ width: menuConfig.size, height: menuConfig.size }}
					onClick={() => setOpen(!open)}
				>
					<div
						style={
							open
								? {
										top: '50%',
										transform: `translateY(-50%) rotate(45deg)`,
								  }
								: {}
						}
					/>
					<div
						style={
							open
								? { transform: 'translateX(-100%) scaleY(0)' }
								: { bottom: '50%', transform: 'translateY(50%)' }
						}
					/>
					<div
						style={
							open
								? {
										bottom: '50%',
										transform: `translateY(50%) rotate(-45deg)`,
								  }
								: {}
						}
					/>
				</BurgerIcon>
				<button onClick={() => setOpen(false)}>
					<Link to="/">Store Name</Link>
				</button>
			</Div>
			<NavContainer style={!open && pageWidth < 768 ? { height: 0 } : {}}>
				<LinkBtn
					onClick={() => setOpen(false)}
					style={
						open || pageWidth > 768
							? { transform: 'translateX(0%)', transitionDelay: '0.2s' }
							: { transform: 'translateX(100%)', transitionDelay: '0.2s' }
					}
					to="/"
				>
					Home
				</LinkBtn>
				<LinkBtn
					onClick={() => setOpen(false)}
					style={
						open || pageWidth > 768
							? { transform: 'translateX(0%)', transitionDelay: '0.3s' }
							: { transform: 'translateX(100%)', transitionDelay: '0.3s' }
					}
					to="/products"
				>
					Products
				</LinkBtn>
			</NavContainer>
			<UserOptions user={user} />
		</Container>
	);
};

const Container = styled.header`
	position: fixed;
	width: 100%;
	top: 0;
	background-color: #ebedf1;
	transition: height 1s;
	z-index: 10;
	@media (min-width: 768px) {
		display: flex;
		justify-content: space-between;
	}
`;
const BurgerIcon = styled.button`
	position: relative;
	overflow: hidden;
	padding: 0;
	cursor: pointer;
	div {
		display: block;
		position: absolute;
		height: 4px;
		width: 100%;
		border-radius: 10px;
		background: #0e2431;
		transform-origin: center;
		transition: all 0.6s ease-in-out;
		&:first-child {
			top: 0;
		}
		&:nth-child(3) {
			bottom: 0;
		}
	}
	@media (min-width: 768px) {
		display: none;
	}
`;

const Div = styled.div`
	display: grid;
	grid-template-columns: 1fr auto 1fr;
	padding: 1rem;
	align-items: center;
	@media (min-width: 768px) {
		display: block;
	}
`;

const NavContainer = styled.nav`
	display: flex;
	flex-direction: column;
	@media (min-width: 768px) {
		flex-direction: row;
	}
`;

const LinkBtn = styled(Link)`
	transition: all 1s;
	text-align: center;
	padding: 1rem;
	@media (min-width: 768px) {
		align-self: center;
	}
`;

export default Navbar;
