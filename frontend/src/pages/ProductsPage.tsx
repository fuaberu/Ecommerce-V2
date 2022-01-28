import React, { ReactPropTypes, useEffect, useState } from "react";
import styled from "styled-components";
import { useGetProductsListQuery } from "../app/sevices/products";
import ProductCard from "../components/product/ProductCard";
import Spinner from "../components/smallComponents/Spinner";
import Slider, { Handle, Range, SliderTooltip } from "rc-slider";
import "rc-slider/assets/index.css";

const ProductsPage = () => {
  const [page, setPage] = useState("0");
  const [limit, setLimit] = useState("10");
  const [minPrice, setMinPrice] = useState("0");
  const [name, setName] = useState<string | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<string | undefined>(undefined);
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [ratingQuery, setRatingQuery] = useState(0);

  const [query, setQuery] = useState(
    `?page=0&limit=${limit}&minPrice=${minPrice}`
  );
  const [errorMessage, setErrorMessage] = useState<string>();
  const { data, error, isLoading, refetch } = useGetProductsListQuery(query);

  useEffect(() => {
    if (error && "data" in error) {
      setErrorMessage(error.data.message);
    } else {
      setErrorMessage("");
    }
  }, [error]);

  const onApply = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let paramsUrl = `?page=${page}&limit=${limit}&minPrice=${minPrice}`;
    if (name) paramsUrl = paramsUrl + `&name=${name}`;
    if (maxPrice) paramsUrl = paramsUrl + `&maxPrice=${maxPrice}`;
    if (category) paramsUrl = paramsUrl + `&category=${category}`;
    if (ratingQuery) paramsUrl = paramsUrl + `&rating=${ratingQuery}`;

    setQuery(paramsUrl);
  };

  const onStarsChange = (arg0: number) => {
    setRatingQuery(arg0 * 0.05);
  };
  const onPriceChange = (arg0: number[]) => {
    setMinPrice(arg0[0].toString());
    setMaxPrice(arg0[1].toString());
  };

  const nextPage = () => {
    if (!data?.nextPage) return;
    const regex = /page=(.*?)&/i;
    const nextPageString = query.replace(regex, `page=${data.page + 1}&`);
    setQuery(nextPageString);
  };
  const prevPage = () => {
    if (!data || data.page < 1) return;
    const regex = /page=(.*?)&/i;
    const prevPageString = query.replace(regex, `page=${data.page - 1}&`);
    setQuery(prevPageString);
  };

  return isLoading || !data ? (
    <Spinner />
  ) : (
    <div>
      <h2>Products</h2>
      <ProductsContainer>
        <FormContainer onSubmit={(e) => onApply(e)}>
          <div className="form-div">
            <label htmlFor="">Price</label>
            <Range
              defaultValue={[0, data.highestPrice]}
              min={0}
              max={data.highestPrice}
              marks={{
                0: { label: 0 },
              }}
              onAfterChange={onPriceChange}
              handle={handle}
            />
          </div>
          <div className="form-div">
            <label htmlFor="">Rating Above</label>
            <Slider
              marks={{
                0: { label: 0 },
                20: { label: 1 },
                40: { label: 2 },
                60: { label: 3 },
                80: { label: 4 },
                100: { label: 5 },
              }}
              onAfterChange={onStarsChange}
              step={20}
            />
          </div>
          <select name="categories">
            <option value="">Categories</option>
          </select>
          <button type="submit">aplly</button>
        </FormContainer>
        {!errorMessage ? (
          <ProductsArea>
            {data.products.map((prod, index) => {
              return <ProductCard key={index} product={prod} />;
            })}
          </ProductsArea>
        ) : (
          <div style={{ flex: 3 }}>
            <p>{errorMessage}</p>
          </div>
        )}
      </ProductsContainer>
      <PaginationContainer>
        <button>Previous</button>
        <div>{error ? 0 : data.page}</div>
        <button onClick={() => nextPage()}>Next</button>
      </PaginationContainer>
    </div>
  );
};

const handle = (props: any) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <SliderTooltip
      prefixCls="rc-slider-tooltip"
      overlay={`$${value}`}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </SliderTooltip>
  );
};

const ProductsArea = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1rem;
  flex: 3;
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 460px) {
    display: flex;
  }
`;

const FormContainer = styled.form`
  padding: 1rem;
  flex: 1;
  .form-div {
    margin-bottom: 2rem;
  }
`;
const ProductsContainer = styled.div`
  @media (min-width: 768px) {
    display: flex;
  }
`;
const PaginationContainer = styled.div`
  display: flex;
`;

export default ProductsPage;
