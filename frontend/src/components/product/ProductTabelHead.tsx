import React from "react";
import styled from "styled-components";

const ProductTabelHead = ({ admin }: { admin?: boolean }) => {
  return (
    <OrderItemsLabel>
      <h3 style={{ flex: admin ? 1.5 : 1 }}>
        {admin ? "Product Id" : "Image"}
      </h3>
      <h3>Product</h3>
      <h3>Price</h3>
      <h3>{admin ? "Stock" : "Quantity"}</h3>
      <h3>{admin ? "Actions" : "Subtotal"}</h3>
    </OrderItemsLabel>
  );
};

const OrderItemsLabel = styled.div`
  display: flex;
  & > * {
    flex: 1;
    align-self: center;
    text-align: center;
  }
`;

export default ProductTabelHead;
