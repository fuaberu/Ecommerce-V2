import React, { useEffect, useState } from 'react';
import { Elements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useGetStripeKeyQuery, usePostPaymentQuery } from '../app/sevices/payment';
import Input from '../components/form/Input';
import { FaRegCreditCard, FaRegCalendarAlt, FaKey } from 'react-icons/fa';
import { RootState } from '../app/store';
import { useSelector } from 'react-redux';

const PaymentPage = () => {
	const [card, setCard] = useState('');
	const [date, setDate] = useState('');
	const [cardKey, setCardKey] = useState('');
	const [skip, setSkip] = useState(true);

	const stripe = useStripe();

	const [paymentBody, setPaymentBody] = useState({ amount: 0, currency: 'USD' });

	const order = useSelector((state: RootState) => state.order);

	const { data: stripeKey } = useGetStripeKeyQuery();
	const {
		data: paymentData,
		error,
		isLoading,
	} = usePostPaymentQuery(paymentBody, { skip });

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setSkip(false);

		setSkip(true);
	};

	useEffect(() => {}, [input]);
	return (
		<Elements stripe={loadStripe(stripeKey?.stripeApiKey || '')}>
			<form onSubmit={(e) => onSubmit(e)}>
				<Input
					state={card}
					setState={setCard}
					placeholder="1616"
					icon={<FaRegCreditCard />}
					isValid={{
						recived: false,
						status: false,
					}}
				/>
				<Input
					state={date}
					setState={setDate}
					placeholder="1616"
					icon={<FaRegCalendarAlt />}
					isValid={{
						recived: false,
						status: false,
					}}
				/>
				<Input
					state={cardKey}
					setState={setCardKey}
					placeholder="1616"
					icon={<FaKey />}
					isValid={{
						recived: false,
						status: false,
					}}
				/>
				<button type="submit">Pay</button>
			</form>
		</Elements>
	);
};

export default PaymentPage;
