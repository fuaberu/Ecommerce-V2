import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "../../app/sevices/products";
import { Rating } from "react-simple-star-rating";
import styled from "styled-components";

const ProductCard = ({ product }: { product: Product }) => {
  const [rating, setRating] = useState(0);
  const handleRating = (rate: number) => {
    setRating(rate);
    // Some logic
  };
  return (
    <Link to={`/${product._id}`}>
      <CardLink>
        <img src={product.mainImage} alt={product.name} />
        <p>{product.name}</p>
        <div>
          <Rating
            onClick={handleRating}
            ratingValue={rating}
            initialValue={product.rating}
            readonly
            size={20}
            transition
          />
          <span>{`${product.numOfReviews} Reviews`}</span>
        </div>
        <span>{`$${product.price}`}</span>
      </CardLink>
    </Link>
  );
};

const CardLink = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(245, 245, 245);
  transition: all 0.4s;
  padding: 0 0.5rem;
  p,
  span:last-child {
    margin: 0.5rem 0;
  }
  img {
    align-self: center;
    max-width: 100%;
    height: 223px;
    object-fit: cover;
  }
  &:hover {
    transform: scale(1.05);
  }
`;

export default ProductCard;
