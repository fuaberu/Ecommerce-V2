import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import styled from "styled-components";
import { useGetAProductQuery } from "../app/sevices/products";
import { addProduct } from "../app/slices/cartSlice";
import { RootState } from "../app/store";
import Carousel from "../components/product/Carousel";

const ProductDetailePage = () => {
  const [rating, setRating] = useState(0);
  const [productQuantity, setProductQuantity] = useState<number>(1);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { productId } = useParams();

  const { data, error, isLoading } = useGetAProductQuery(productId || "");
  const cart = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    if (data && data.product.stock < 1) setProductQuantity(0);
  }, [data]);

  if (!data) return <p>Nodata</p>;

  const addToCart = () => {
    const currentQantity =
      cart.cartItems.find((e) => e.value._id === productId)?.quantity || 0;
    if (currentQantity + productQuantity > data.product.stock) return;
    //alert that thats the stock
    dispatch(addProduct({ value: data.product, quantity: productQuantity }));
    navigate("/cart");
  };

  const handleRating = (rate: number) => {
    setRating(rate);
    // Some logic
  };
  const minusQuantity = () => {
    setProductQuantity(productQuantity > 1 ? productQuantity - 1 : 1);
  };
  const plusQuantity = () => {
    if (data.product.stock < 1) return;
    const currentQantity =
      cart.cartItems.find((e) => e.value._id === productId)?.quantity || 0;

    if (productQuantity >= data.product.stock - currentQantity) return;

    setProductQuantity(productQuantity + 1);
  };

  console.log(data);

  return (
    <div>
      <ProductContainer>
        <ImageSection>
          <Carousel
            images={[data.product.mainImage, ...data.product.detailedImages]}
          />
        </ImageSection>
        <BuySection>
          <h2>{data.product.name}</h2>
          <p>{`ProductId: ${data.product._id}`}</p>
          <Rating
            onClick={handleRating}
            ratingValue={rating}
            initialValue={data.product.rating}
            readonly
            size={20}
            transition
          />
          <span>{` ${data.product.numOfReviews} Reviews`}</span>
          <h1>{`$${data.product.price.toFixed(2)}`}</h1>
          <Flex>
            <div>
              <NumericButton onClick={() => minusQuantity()}>-</NumericButton>
              <input
                type="number"
                name="amount"
                id="token"
                inputMode="numeric"
                value={productQuantity}
                onChange={(value) =>
                  setProductQuantity(parseFloat(value.target.value))
                }
                pattern="[0-9]*"
                style={{
                  width: `${data.product.stock.toString().length}ch`,
                  height: "1.5rem",
                  padding: "0 0.5rem",
                  border: "none",
                  textAlign: "center",
                }}
                max={data.product.stock}
              />
              <NumericButton onClick={() => plusQuantity()}>+</NumericButton>
            </div>
            <button onClick={() => addToCart()}>add to cart</button>
          </Flex>
          <p>
            Status:{" "}
            <b
              style={
                data.product.stock > 0 ? { color: "green" } : { color: "red" }
              }
            >
              {data.product.stock > 0 ? "In Stock" : "Out Of Stock"}
            </b>
          </p>
          <div>
            Description:
            <p>{data.product.description}</p>
          </div>
          <AddReviewButton>Add a Review</AddReviewButton>
        </BuySection>
      </ProductContainer>
    </div>
  );
};

const ImageSection = styled.section`
  flex: 1;
`;
const BuySection = styled.section`
  flex: 1;
`;
export const NumericButton = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  background-color: tomato;
`;

const AddReviewButton = styled.button`
  background-color: tomato;
`;

const ReviewsSection = styled.section``;

const Flex = styled.div`
  display: flex;
`;
const ProductContainer = styled.div`
  padding: 5%;
  @media (min-width: 768px) {
    display: flex;
    padding: 2rem;
  }
`;

export default ProductDetailePage;
