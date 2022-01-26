import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  useGetStripeKeyQuery,
  usePostPaymentQuery,
} from "../app/sevices/payment";

import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import PaymentContainer from "../components/payment/PaymentContainer";
import styled from "styled-components";

const PaymentPage = () => {
  const [stripeKey, setStripeKey] = useState<string>();
  const [clientSecret, setClientSecret] = useState<string>();
  const [skip, setSkip] = useState(true);

  const order = useSelector((state: RootState) => state.order);

  const { data: stripeKeyData, error: keyError } = useGetStripeKeyQuery();
  const { data: clientSecretData, error: secretError } = usePostPaymentQuery(
    {
      amount: order.totalPrice * 100,
      currency: "eur",
    },
    { skip: skip }
  );

  useEffect(() => {
    if (stripeKeyData?.stripeApiKey && order.totalPrice > 0) {
      setSkip(false);
    } else {
      setSkip(true);
    }
  }, [stripeKeyData]);

  useEffect(() => {
    stripeKeyData && setStripeKey(stripeKeyData.stripeApiKey);
    clientSecretData && setClientSecret(clientSecretData.client_secret);
  }, [stripeKeyData, clientSecretData]);

  if (!stripeKey) return <div>No key</div>;
  const stripePromise = loadStripe(stripeKey);

  const options = {
    clientSecret: clientSecret,
    appearance: {
      theme: "flat" as "flat",
    },
  };

  return (
    <Container>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <PaymentContainer />
        </Elements>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem;
`;

export default PaymentPage;
