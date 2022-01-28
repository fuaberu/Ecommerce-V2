import React from "react";
import styled from "styled-components";
import { useGetAllOrdersQuery } from "../../app/sevices/orders";
import { useGetAllProductsQuery } from "../../app/sevices/products";
import ProductTabelHead from "../../components/product/ProductTabelHead";
import { BsTrash } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";

const ProductsBoard = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  return (
    <div>
      <ProductTabelHead admin />
      {data?.products.map((product, index) => (
        <ProductContainer>
          <p style={{ flex: 1.5 }}>{product._id}</p>
          <p>{product.name}</p>
          <p>{product.stock}</p>
          <p>{product.price}</p>
          <div>
            <button>
              <BsTrash size={24} />
            </button>
            <button>
              <AiOutlineEdit size={24} />
            </button>
          </div>
        </ProductContainer>
      ))}
    </div>
  );
};

const ProductContainer = styled.div`
  display: flex;
  & > * {
    flex: 1;
    align-self: center;
    text-align: center;
  }
`;

export default ProductsBoard;
