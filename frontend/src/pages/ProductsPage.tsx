import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  useGetProductsCategoriesQuery,
  useGetProductsListQuery,
} from "../app/sevices/products";
import ProductCard from "../components/product/ProductCard";
import Spinner from "../components/smallComponents/Spinner";
import Slider, { Handle, Range, SliderTooltip } from "rc-slider";
import "rc-slider/assets/index.css";
import { ActionButton } from "./ProductDetailePage";
import SearchBar from "../components/product/SearchBar";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ProductsPage = () => {
  const [page, setPage] = useState("0");
  const [limit, setLimit] = useState("2");
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState<string | undefined>(undefined);
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [sort, setSort] = useState<string | undefined>(undefined);
  const [ratingQuery, setRatingQuery] = useState(0);
  const [pageWidth, setPageWidth] = useState<number>(window.innerWidth);

  const [query, setQuery] = useState(
    `?page=${page}&limit=${limit}&minPrice=${minPrice}`
  );
  const [errorMessage, setErrorMessage] = useState<string>();
  const { data, error, isLoading } = useGetProductsListQuery(query);
  useEffect(() => {
    console.log(data);
  }, [data]);
  const { data: categories } = useGetProductsCategoriesQuery();

  useEffect(() => {
    function handleResize() {
      setPageWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    if (maxPrice) paramsUrl = paramsUrl + `&maxPrice=${maxPrice}`;
    if (category) paramsUrl = paramsUrl + `&category=${category}`;
    if (sort) paramsUrl = paramsUrl + `&sort=${sort}`;
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
    const nextPageNum = (Number(page) + 1).toString();
    setPage(nextPageNum);
    const regex = /page=(.*?)&/i;
    const nextPageString = query.replace(regex, `page=${nextPageNum}&`);
    setQuery(nextPageString);
  };
  const prevPage = () => {
    if (!data || data.page < 1) return;
    const prevPageNum = (Number(page) - 1).toString();
    setPage(prevPageNum);
    const regex = /page=(.*?)&/i;
    const prevPageString = query.replace(regex, `page=${prevPageNum}&`);
    setQuery(prevPageString);
  };

  return isLoading || !data ? (
    <Spinner />
  ) : (
    <Container>
      <h2>Products</h2>
      {pageWidth < 768 && <SearchBar />}
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
          <SelectInput onChange={(e) => setCategory(e.target.value)}>
            <option value="">Categories</option>
            {categories &&
              categories?.categories.map((op, index) => (
                <option value={op} key={index}>
                  {op}
                </option>
              ))}
          </SelectInput>
          <SelectInput onChange={(e) => setSort(e.target.value)}>
            <option value="">Sort by</option>
            <option value="priceL>H">Price: Low to High</option>
            <option value="priceH>L">Price: High to Low</option>
            <option value="review">Avg. Customer Review</option>
            <option value="newest">Newest Arrivals</option>
          </SelectInput>
          <SelectInput onChange={(e) => setLimit(e.target.value)}>
            <option value="12">Results per page</option>
            <option value="24">24</option>
            <option value="48">48</option>
          </SelectInput>
          <ActionButton type="submit">Aplly</ActionButton>
        </FormContainer>
        {!isLoading ? (
          <section style={{ flex: 4, paddingBottom: "1rem" }}>
            <ProductsArea>
              {data.products.map((prod, index) => {
                return <ProductCard key={index} product={prod} />;
              })}
            </ProductsArea>
            <PaginationContainer>
              <button disabled={data.page <= 1 || isLoading} onClick={prevPage}>
                <FaChevronLeft size={18} />
              </button>
              <span>{error ? 0 : data.page}</span>
              <button disabled={!data.nextPage || isLoading} onClick={nextPage}>
                <FaChevronRight size={18} />
              </button>
            </PaginationContainer>
          </section>
        ) : (
          <section style={{ flex: 4 }}>
            <Spinner />
          </section>
        )}
        {errorMessage && <p>{errorMessage}</p>}
      </ProductsContainer>
    </Container>
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

const Container = styled.div`
  h2 {
    text-align: center;
    padding: 0.7rem;
  }
`;

const ProductsArea = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1rem;
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
  display: flex;
  flex-direction: column;
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
  justify-content: center;
  button,
  span {
    display: flex;
  }
  span {
    margin: 0 10px;
  }
`;
const SelectInput = styled.select`
  height: 28px;
  text-align: center;
  outline: none;
  border: 1px solid black;
  border-radius: 5px;
  width: 100%;
  max-width: 380px;
  margin-bottom: 1rem;
`;

export default ProductsPage;
