import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import { MdOutlineDashboard, MdKeyboardArrowDown } from "react-icons/md";
import { BsArrowDownUp } from "react-icons/bs";
import { FaRegListAlt } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { GiNotebook } from "react-icons/gi";
import { AiOutlinePlus } from "react-icons/ai";

const SideMenu = () => {
  const [showProduct, setShowProduct] = useState(false);

  return (
    <DashboardMenu>
      <NavLink to="">
        <MdOutlineDashboard size={24} /> Dashboard
      </NavLink>
      <button onClick={() => setShowProduct(!showProduct)}>
        {showProduct ? (
          <MdKeyboardArrowDown size={24} />
        ) : (
          <BsArrowDownUp size={24} />
        )}{" "}
        Products
      </button>
      {showProduct && (
        <div>
          <Link to="products">
            <BsArrowDownUp size={18} /> All
          </Link>
          <Link to="products/new">
            <AiOutlinePlus size={18} /> Create
          </Link>
        </div>
      )}
      <Link to="orders">
        <FaRegListAlt size={24} /> Orders
      </Link>
      <Link to="users">
        <FiUsers size={24} /> Users
      </Link>
      <Link to="reviews">
        <GiNotebook size={24} /> Reviews
      </Link>
    </DashboardMenu>
  );
};

const DashboardMenu = styled.nav`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 15vw;
  height: 100%;
  background-color: gold;
  div {
    a {
      padding: 0 2rem;
      font-size: 0.8rem;
    }
  }
  button,
  a {
    padding: 0.5rem 1rem;
    margin: 0.5rem 0;
    display: flex;
    align-items: center;
    svg {
      margin-right: 0.5rem;
    }
  }
`;

export default SideMenu;
