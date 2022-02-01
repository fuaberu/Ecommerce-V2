import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useGetAllProductsQuery } from "../app/sevices/products";
import ProductCard from "../components/product/ProductCard";
import heroImage from "../assets/pexels-engin-akyurt.jpg";

const Homepage = () => {
  const shopRef = React.useRef<HTMLInputElement>(null);
  const { data, error, isLoading } = useGetAllProductsQuery();

  const scrollToShop = () => {
    window.scrollTo(0, shopRef.current?.offsetTop || 0);
  };

  useEffect(() => {
    console.log(data, error);
  }, [error, data]);

  return (
    <div>
      <HeroContainer>
        <img src={heroImage} />
        <div>
          <h2>New Products</h2>
          <button onClick={scrollToShop}>Shop now</button>
        </div>
      </HeroContainer>
      <ProductsContainer ref={shopRef}>
        <h2>Latest Products</h2>
        <ProductsDisplay>
          {data &&
            data.products.map((prod, index) => {
              return <ProductCard key={index} product={prod} />;
            })}
        </ProductsDisplay>
      </ProductsContainer>
    </div>
  );
};

const HeroContainer = styled.section`
  position: relative;
  height: calc(100vh - ${(props) => props.theme.navHeight});
  width: 100%;
  overflow: hidden;
  display: flex;
  img {
    position: absolute;
    top: -35vw;
    max-width: 100%;
  }
  div {
    position: absolute;
    left: 5vw;
    bottom: 15vh;
    h2 {
      font-size: 3rem;
      color: #fff;
    }
    button {
      font-size: 2rem;
      color: #fff;

      border-bottom: 2px solid transparent;
      &:hover {
        border-bottom-color: #fff;
      }
    }
  }
  @media screen and (max-width: 650px) {
    img {
      position: initial;
      object-fit: cover;
      width: 100%;
    }
  }
`;

const ProductsContainer = styled.section`
  h2 {
    text-align: center;
    padding: 1rem;
  }
  min-height: calc(100vh - ${(props) => props.theme.navHeight});
`;

export const ProductsDisplay = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  max-width: 100%;
  @media screen and (max-width: 400px) {
    grid-template-columns: repeat(1, 1fr);
  }
  @media screen and (max-width: 650px) and (min-width: 401px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 900px) and (min-width: 651px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export default Homepage;
