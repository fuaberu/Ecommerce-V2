import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Product, useGetProductsListQuery } from "../../app/sevices/products";

const SearchBar = () => {
  const [results, setResults] = useState<Product[]>([]);
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const { data, error, isLoading, refetch } = useGetProductsListQuery(
    `?name=${name}&limit=10`,
    { skip: !name }
  );

  useEffect(() => {
    data && setResults(data.products);
  }, [data]);

  const openProduct = (id: string) => {
    setName("");
    navigate(id);
  };

  return (
    <SearchBarContainer>
      <input
        type="text"
        name="search"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <SearchButton>
        <AiOutlineSearch size={24} />
      </SearchButton>
      <div>
        {name &&
          results &&
          results.map((op, index) => (
            <button key={index} onClick={() => openProduct(op._id)}>
              <p>{op.name}</p>
            </button>
          ))}
      </div>
    </SearchBarContainer>
  );
};

const SearchBarContainer = styled.div`
  position: relative;
  width: 90%;
  max-width: 400px;
  margin: 1rem auto;
  div {
    width: 100%;
    border-radius: 5px;
    margin-top: 2px;
    background-color: #fff;
    border: 1px solid #ececec;
    button {
      padding: 0.5rem;
      background-color: #fff;
      width: 100%;
      text-align: left;
      &:hover {
        background-color: #f5f5f5;
      }
    }
  }
  input {
    width: 100%;
    height: 40px;
    padding: 10px 40px 10px 10px;
    border: 1px solid #000;
    border-radius: 5px;
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default SearchBar;
