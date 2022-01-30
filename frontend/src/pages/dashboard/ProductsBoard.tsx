import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "../../app/sevices/products";
import ProductTabelHead from "../../components/product/ProductTabelHead";
import { BsTrash } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
const ProductsBoard = () => {
  const [deleting, setDeleting] = useState(false);

  const { data, error, isLoading, refetch } = useGetAllProductsQuery();

  const [deleteProduct, { isLoading: isDeleting, error: deleteError }] =
    useDeleteProductMutation();

  useEffect(() => {
    if (isDeleting || isLoading) {
      setDeleting(true);
    } else {
      setDeleting(false);
    }
  }, [isDeleting, isLoading]);

  const deleteData = (id: string) => {
    //delete from db and then refetch the data
    deleteProduct(id).then((e) => {
      console.log(e);
      refetch();
    });
  };
  return (
    <div>
      <ProductTabelHead admin />
      {!error
        ? data?.products.map((product, index) => (
            <ProductContainer key={index}>
              <p style={{ flex: 1.5 }}>{product._id}</p>
              <p>{product.name}</p>
              <p>{product.price}</p>
              <p>{product.stock}</p>
              <div>
                <button onClick={() => deleteData(product._id)}>
                  <BsTrash size={24} />
                </button>
                <button>
                  <AiOutlineEdit size={24} />
                </button>
              </div>
            </ProductContainer>
          ))
        : console.log(error, data)}
      {deleting && <h1>deleting</h1>}
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
