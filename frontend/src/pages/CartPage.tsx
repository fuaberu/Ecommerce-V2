import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { OrderItems, setOrderInfo } from "../app/slices/orderSlice";
import { RootState } from "../app/store";
import CartItem from "../components/cart/CartItem";
import Spinner from "../components/smallComponents/Spinner";
import { ActionButton } from "./ProductDetailePage";

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
        image: i.value.mainImage,
        productId: i.value._id,
      });
    });

    dispatch(
      setOrderInfo({
        items,
        totalPrice,
        orderStatus: "processing",
        taxPrice: 0,
        shippingPrice: 0,
      })
    );
  };
  return (
    <Fragment>
      {cart.cartItems.length > 0 ? (
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
          <div style={{ textAlign: "center" }}>
            <hr />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <p>{`Total: $${totalPrice}`}</p>
            </div>
            <ActionButton disabled={!totalPrice} onClick={clickCheckout}>
              Check Out
            </ActionButton>
          </div>
        </CartContainer>
      ) : (
        <NoItemsMessage>
          <h2>Your cart is empty!</h2>
          <Link to={"/products"}>Go to products pages</Link>
        </NoItemsMessage>
      )}
    </Fragment>
  );
};

const CartContainer = styled.div`
  padding: 2rem 4rem;
  div {
    :first-child {
      display: flex;
    }
  }
  hr {
    margin: 1rem auto;
    border-top-width: 2px;
  }
  @media screen and (max-width: 550px) {
    padding: 4rem 3vw 0 3vw;
  }
`;
const NoItemsMessage = styled.div`
  padding-top: 15vh;
  line-height: 2rem;
  text-align: center;
  a {
    color: #585555;
    &:hover {
      border-bottom: 2px solid #585555;
    }
  }
`;

export default CartPage;
