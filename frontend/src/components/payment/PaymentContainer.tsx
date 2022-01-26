import React, { useEffect, useState } from "react";
import Input from "../form/Input";
import { FaRegCreditCard, FaRegCalendarAlt, FaKey } from "react-icons/fa";
import {
  CardElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { usePostPaymentQuery } from "../../app/sevices/payment";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import styled from "styled-components";
import { clearCart } from "../../app/slices/cartSlice";

const PaymentContainer = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (!paymentIntent) return setMessage("Something went wrong.");
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
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
  }, [stripe]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000",
      },
    });

    if (!error) dispatch(clearCart());

    if (error.type === "card_error" || error.type === "validation_error") {
      error.message && setMessage(error.message);
    } else {
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
