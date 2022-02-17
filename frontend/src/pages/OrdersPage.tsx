import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useGetMyOrdersQuery } from "../app/sevices/orders";
import { setDetailedOrder } from "../app/slices/detailedOrder";
import { IOrder } from "../app/slices/orderSlice";
import Spinner from "../components/smallComponents/Spinner";

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
      {isLoading && <Spinner />}
      <h2>My Orders</h2>
      <table>
        <tr>
          <th>Payment Id</th>
          <th>Status</th>
          <th>Items</th>
          <th>Price</th>
        </tr>
        {data?.orders.map((o, i) => (
          <tr key={i} onClick={() => handleClick(o)}>
            <td>{o.paymentInfo.id}</td>
            <td style={o.orderStatus === "paid" ? { color: "green" } : {}}>
              {o.orderStatus}
            </td>
            <td>{o.orderItems?.reduce((a, b) => a + b.quantity, 0)}</td>
            <td>{o.totalPrice + "$"}</td>
          </tr>
        ))}
      </table>
      {error && <p>{error}</p>}
    </OrderTabel>
  );
};

const OrderTabel = styled.div`
  h2 {
    text-align: center;
    padding: 1rem;
  }
  table {
    width: 100%;
    border-spacing: 0 10px;
    td {
      &:not(:first-child) {
        text-align: center;
      }
    }
    tr {
      &:not(:first-child) {
        padding: 1rem;
        &:hover {
          box-shadow: 0 0 10px 1px #747373;
          border-radius: 5px;
          cursor: pointer;
        }
      }
    }
    @media screen and (min-width: 768px) {
      border-spacing: 10vw 10px;
      td {
        text-align: center;
      }
    }
  }
`;

export default OrdersPage;
