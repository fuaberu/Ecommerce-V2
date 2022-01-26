import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  OrderItems,
  setOrderCart,
  setOrderInfo,
} from "../app/slices/orderSlice";
import { RootState } from "../app/store";
import CartItem from "../components/cart/CartItem";

const CartPage = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let total = 0;
    cart.cartItems.map((item) => (total += item.quantity * item.value.price));
    setTotalPrice(total);
  }, [cart]);

  const clickCheckout = () => {
    navigate("/checkout/shipping");
    let items: OrderItems[] = [];
    cart.cartItems.forEach((i) => {
      items.push({
        quantity: i.quantity,
        name: i.value.name,
        price: i.value.price,
        image: i.value.mainImage.url,
        productId: i.value._id,
      });
    });

    // dispatch(setOrderCart({ items }));
    dispatch(
      setOrderInfo({
        items,
        totalPrice,
        orderStatus: "analising",
        taxPrice: 0,
        shippingPrice: 0,
      })
    );
  };
  return (
    <CartContainer>
      <div>
        <h4 style={{ flex: 1, textAlign: "start" }}>Image</h4>
        <h4 style={{ flex: 1, textAlign: "center" }}>Product</h4>
        <h4 style={{ flex: 1, textAlign: "center" }}>Price</h4>
        <h4 style={{ flex: 1, textAlign: "center" }}>Quantity</h4>
        <h4 style={{ flex: 1, textAlign: "end" }}>Subtotal</h4>
      </div>
      {cart.cartItems.map((item, index) => (
        <CartItem key={index} item={item} />
      ))}
      <div>
        <hr />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <p>{`Total: $${totalPrice}`}</p>
        </div>
        <button onClick={clickCheckout}>Check Out</button>
      </div>
    </CartContainer>
  );
};

const CartContainer = styled.div`
  padding: 2rem;
  div {
    :first-child {
      display: flex;
    }
  }
  hr {
    margin-top: 1rem;
    border-top-width: 3px;
  }
`;

export default CartPage;
