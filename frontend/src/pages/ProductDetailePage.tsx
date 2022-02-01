import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import styled from "styled-components";
import { useGetAProductQuery } from "../app/sevices/products";
import { addProduct } from "../app/slices/cartSlice";
import { RootState } from "../app/store";
import Carousel from "../components/product/Carousel";
import Spinner from "../components/smallComponents/Spinner";

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

  if (!data) return <Spinner />;

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
    if (data.product.stock < 1) return;
    setProductQuantity(productQuantity > 1 ? productQuantity - 1 : 1);
  };
  const plusQuantity = () => {
    if (data.product.stock < 1) return;
    const currentQantity =
      cart.cartItems.find((e) => e.value._id === productId)?.quantity || 0;

    if (productQuantity >= data.product.stock - currentQantity) return;

    setProductQuantity(productQuantity + 1);
  };

  const onQuantityChange = (value: React.ChangeEvent<HTMLInputElement>) => {
    if (parseFloat(value.target.value) <= data.product.stock) {
      setProductQuantity(parseFloat(value.target.value));
    }
  };

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
                onChange={(value) => onQuantityChange(value)}
                pattern="[0-9]*"
                style={{
                  width: "2rem",
                  margin: "0 0.5rem",
                  height: "1.5rem",
                  border: "none",
                  textAlign: "center",
                }}
                max={data.product.stock}
              />
              <NumericButton onClick={() => plusQuantity()}>+</NumericButton>
            </div>
            <ActionButton
              disabled={!data.product.stock}
              onClick={() => addToCart()}
            >
              ADD TO CART
            </ActionButton>
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
          <ActionButton>Add a Review</ActionButton>
        </BuySection>
      </ProductContainer>
    </div>
  );
};

const ImageSection = styled.section`
  flex: 1.3;
`;
const BuySection = styled.section`
  flex: 1;
  line-height: 2.5rem;
`;
export const NumericButton = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  background-color: #fc6e55;
`;

export const ActionButton = styled.button`
  background-color: #fc6e55;
  color: #fff;
  padding: 0.5rem 2rem;
  border-radius: 5px;
  font-weight: 500;
  &:disabled {
    background-color: #ee7e6a;
  }
  &:hover {
    background-color: #f74e30;
  }
`;

const ReviewsSection = styled.section``;

const Flex = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
const ProductContainer = styled.div`
  padding: 5vw;
  gap: 1rem;
  @media (min-width: 768px) {
    display: flex;
    padding: 2rem;
  }
`;

export default ProductDetailePage;
