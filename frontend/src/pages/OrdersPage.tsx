import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useGetMyOrdersQuery } from "../app/sevices/orders";
import { setDetailedOrder } from "../app/slices/detailedOrder";
import { IOrder } from "../app/slices/orderSlice";

const OrdersPage = () => {
  const { data, error, isLoading } = useGetMyOrdersQuery();

  const navigate = useNavigate();
  const dispach = useDispatch();

  const handleClick = (order: IOrder) => {
    dispach(setDetailedOrder({ order }));
    navigate(`${order._id}`);
  };

  return (
    <OrderTabel>
      {data?.orders.map((o, i) => (
        <button type="button" key={i} onClick={() => handleClick(o)}>
          <p>{o.paymentInfo.id}</p>
          <p>{o.orderStatus}</p>
          <p>{o.orderItems?.reduce((a, b) => a + b.quantity, 0)}</p>
          <p>{o.totalPrice}</p>
        </button>
      ))}
    </OrderTabel>
  );
};

const OrderTabel = styled.div`
  button {
    display: flex;
    justify-content: space-between;
    width: 100%;
    &:hover {
      box-shadow: 0 0 10px 1px #747373;
      border-radius: 5px;
    }
    p {
      flex: 1;
      text-align: center;
    }
  }
`;

export default OrdersPage;
