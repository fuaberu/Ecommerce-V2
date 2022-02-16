import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import styled from "styled-components";
import { clearCart } from "../../app/slices/cartSlice";
import { useCreateOrderMutation } from "../../app/sevices/orders";
import { clearOrder } from "../../app/slices/orderSlice";
import { useNavigate } from "react-router-dom";
import { useSetProductStockMutation } from "../../app/sevices/products";

const PaymentContainer = ({ clientSecret }: { clientSecret: string }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const order = useSelector((state: RootState) => state.order);
  const user = useSelector((state: RootState) => state.user);

  const [createOrder] = useCreateOrderMutation();
  const [updateProductsStock] = useSetProductStockMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (!paymentIntent) return setMessage("Something went wrong.");
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          //clear current order slice
          dispatch(clearOrder());
          //create new order in db
          createOrder({
            ...order,
            paymentInfo: { id: paymentIntent.id, status: paymentIntent.status },
            orderStatus: "paid",
          });
          //go back to home page
          navigate("/");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe, clientSecret, order, createOrder, dispatch, navigate]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!stripe || !elements || !user.user) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `http://localhost:3000/success/${clientSecret}`,
        receipt_email: user.user.email,
        shipping: {
          name: user.user.name,
          address: {
            city: order.shippingInfo?.city,
            country: order.shippingInfo?.country,
            line1: order.shippingInfo?.address as string,
            postal_code: order.shippingInfo?.zipCode.toString(),
            state: order.shippingInfo?.state,
          },
        },
      },
    });

    if (!error) {
      dispatch(clearCart());
      const result = order.orderItems?.map((i) => {
        return { id: i.productId, quantity: -i.quantity };
      });
      result && result.length > 0 && updateProductsStock({ data: result });
      setIsLoading(false);
      return;
    }

    if (error.type === "card_error" || error.type === "validation_error") {
      error.message && setMessage(error.message);
    } else {
      console.log(error.message);
      setMessage("An unexpected error occured.");
    }
    setIsLoading(false);
  };

  return (
    <FormContainer id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </FormContainer>
  );
};

const FormContainer = styled.form`
  max-width: 500px;
  margin: auto;
  text-align: center;
  button {
    padding: 1rem 3rem;
    background-color: #57c9e6;
    color: #fff;
    font-weight: 700;
    margin: 1rem;
    border-radius: 5px;
    font-size: 1.5rem;
  }
`;

export default PaymentContainer;
