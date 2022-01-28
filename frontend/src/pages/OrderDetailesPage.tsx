import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../app/store";
import ProductTabelHead from "../components/product/ProductTabelHead";

const OrderDetailesPage = () => {
  const detailedOrder = useSelector((state: RootState) => state.detailedOrder);
  return (
    <>
      <Section>
        <h2>Order {detailedOrder.order?._id}</h2>
        <div>
          <h3>Shipping Info</h3>
          <p>
            Name: <span>{detailedOrder.order?.name}</span>
          </p>
          <p>
            Address:{" "}
            <span>{`${detailedOrder.order?.shippingInfo?.address}, ${detailedOrder.order?.shippingInfo?.city}, ${detailedOrder.order?.shippingInfo?.state}, ${detailedOrder.order?.shippingInfo?.country}, ${detailedOrder.order?.shippingInfo?.zipCode}`}</span>
          </p>
          <p>
            Phone: <span>{detailedOrder.order?.shippingInfo?.phoneNumber}</span>
          </p>
        </div>
        <div>
          <h3>Payment</h3>
          <p>
            Status: <span>{detailedOrder.order?.paymentInfo.status}</span>
          </p>
          <p>
            Amount: <span>{`$${detailedOrder.order?.totalPrice}`}</span>
          </p>
        </div>
        <div>
          <h3>Order Status</h3>
          <p>{detailedOrder.order?.orderStatus}</p>
        </div>
      </Section>
      <hr />
      <Section>
        <h2>Order Items</h2>
        <ProductTabelHead />
        {detailedOrder.order?.orderItems?.map((item, index) => {
          return (
            <OrderItem>
              <div>
                <img src={item.image} alt={item.name} />
              </div>
              <p>{item.name}</p>
              <p>{`$${item.price}`}</p>
              <p>{item.quantity}</p>
              <p>{`$${item.price * item.quantity}`}</p>
            </OrderItem>
          );
        })}
      </Section>
    </>
  );
};

const Section = styled.section`
  padding: 1rem;
`;

const OrderItem = styled.div`
  display: flex;
  height: 10vh;
  img {
    height: 10vh;
  }
  & > * {
    flex: 1;
    align-self: center;
    text-align: center;
  }
`;

export default OrderDetailesPage;
