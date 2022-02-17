import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RootState } from "../app/store";
import { ActionButton } from "./ProductDetailePage";

const ConfirmOrder = () => {
  const [subtotal, setSubtotal] = useState(0);
  const order = useSelector((state: RootState) => state.order);
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    let num = 0;
    order.orderItems?.forEach((i) => (num += i.price * i.quantity));
    setSubtotal(num);
  }, [order]);

  const paymentClick = () => {
    navigate("/checkout/payment");
  };

  return (
    <Container>
      <div style={{ padding: "5vw" }}>
        <div>
          <h3>Shipping Info</h3>
          <Flex>
            <p>Name:</p>
            <span>{user.user?.name}</span>
          </Flex>
          <Flex>
            <p>Phone:</p>
            <span>{order.shippingInfo?.phoneNumber}</span>
          </Flex>
          <Flex>
            <p>Address: </p>
            <span>{` ${order.shippingInfo?.address}, ${order.shippingInfo?.city}, ${order.shippingInfo?.state}, ${order.shippingInfo?.zipCode}, ${order.shippingInfo?.country}`}</span>
          </Flex>
        </div>
        <div>
          <h3>Your Cart:</h3>
          {order.orderItems?.map((item, index) => {
            return (
              <CartItem key={index}>
                <img src={item.image} alt="product" />
                <p>{item.name}</p>
                <p>{`${item.quantity} X $${item.price} = ${
                  item.quantity * item.price
                }`}</p>
              </CartItem>
            );
          })}
        </div>
      </div>
      <hr />
      <OrderSummaryContainer>
        <h3>OrderSummary</h3>
        <hr />
        <Flex>
          <p>Subtotal:</p>
          <span>{`$${subtotal}`}</span>
        </Flex>
        <Flex>
          <p>Shipping fee:</p>
          <span>{`$${order.shippingPrice}`}</span>
        </Flex>
        <Flex>
          <p>Tax fee:</p>
          <span>{`$${subtotal * order.taxPrice}`}</span>
        </Flex>
        <hr />
        <Flex>
          <h4>Total:</h4>
          <span>{`$${
            subtotal + order.shippingPrice + subtotal * order.taxPrice
          }`}</span>
        </Flex>
        <ActionButton onClick={paymentClick}>Proceed To Payment</ActionButton>
      </OrderSummaryContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  padding: 1rem;
  p {
    margin: 0;
  }
  div {
    :first-child {
      flex: 2;

      div {
        margin-bottom: 1rem;
      }
    }
    :nth-child(3) {
      flex: 1;
      div {
        margin-bottom: 1rem;
      }
    }
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
  padding: 1rem;
  img {
    height: 10vh;
  }
  p {
    :nth-child(2) {
      flex: 1;
      text-align: center;
    }
  }
`;
const Flex = styled.div`
  display: flex;
`;
const OrderSummaryContainer = styled.div`
  padding: 5vw;
  div {
    justify-content: space-between;
    :last-child {
      h4 {
        margin: 0;
      }
    }
  }
`;

export default ConfirmOrder;
