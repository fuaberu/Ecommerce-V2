import React, { Fragment } from 'react';
import styled from 'styled-components';
import { BsFillCartCheckFill } from 'react-icons/bs';
import { MdLocalShipping, MdPayment } from 'react-icons/md';
import { Outlet, useLocation } from 'react-router-dom';

const CheckOutSteps = () => {
	let location = useLocation();
	const current = location.pathname.split('/').pop();
	return (
		<Fragment>
			<StepsContainer>
				<div>
					<MdLocalShipping size={24} color={current === 'shipping' ? 'green' : 'black'} />
					<h4>Shipping Detailes</h4>
				</div>
				<div>
					<BsFillCartCheckFill
						color={current === 'order' ? 'green' : 'black'}
						size={24}
					/>
					<h4>Confirm Order</h4>
				</div>
				<div>
					<MdPayment size={24} />
					<h4>Payment</h4>
				</div>
			</StepsContainer>
			<Outlet />
		</Fragment>
	);
};
const StepsContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-around;
	div {
		text-align: center;
		h4 {
			margin: 0.5rem;
		}
	}
`;
export default CheckOutSteps;
