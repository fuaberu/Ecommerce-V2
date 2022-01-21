import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
	ICartItem,
	CartState,
	setProductQuantity,
	removeProduct,
} from '../../app/slices/cartSlice';
import { NumericButton } from '../../pages/ProductDetailePage';

const CartItem = ({ item }: { item: ICartItem }) => {
	const dispatch = useDispatch();

	const setQuantity = (quantity: number) => {
		dispatch(setProductQuantity({ id: item.value._id, quantity }));
	};
	const minusQuantity = () => {
		if (item.quantity - 1 === 0) removeItem();
		const stateQuantity = item.quantity > 0 ? item.quantity - 1 : 0;
		dispatch(setProductQuantity({ id: item.value._id, quantity: stateQuantity }));
	};
	const plusQuantity = () => {
		if (item.value.stock < 1 || item.quantity + 1 > item.value.stock) return;
		dispatch(setProductQuantity({ id: item.value._id, quantity: item.quantity + 1 }));
	};
	const removeItem = () => {
		dispatch(removeProduct({ id: item.value._id }));
	};

	return (
		<ItemDiv>
			<div>
				<img src={item.value.mainImage.url} alt="" />
			</div>
			<div style={{ flexDirection: 'column' }}>
				<Link to={`/${item.value._id}`}>{item.value.name}</Link>
				<button onClick={() => removeItem()}>Remove</button>
			</div>
			<div>
				<span>{`$${item.value.price}`}</span>
			</div>
			<div>
				<NumericButton onClick={() => minusQuantity()}>-</NumericButton>
				<input
					type="number"
					name="amount"
					id="token"
					inputMode="numeric"
					value={item.quantity}
					onChange={(value) => setQuantity(parseInt(value.target.value))}
					pattern="[0-9]*"
					max={5}
				/>
				<NumericButton onClick={() => plusQuantity()}>+</NumericButton>
			</div>
			<div>
				<span>{`$${item.quantity * item.value.price}`}</span>
			</div>
		</ItemDiv>
	);
};

const ItemDiv = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 15vh;
	input {
		width: 5ch;
		height: 1.5rem;
		padding: 0 0.5rem;
		border: none;
		text-align: center;
	}
	img {
		max-height: 15vh;
	}
	div {
		display: flex;
		flex: 1;
		align-items: center;
		justify-content: center;
		:first-child {
			justify-content: start;
		}
		:last-child {
			justify-content: end;
		}
	}
`;

export default CartItem;
