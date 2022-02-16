import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IUser } from "../../app/slices/userSlice";
import {
  AiOutlineLogout,
  AiOutlineLogin,
  AiOutlineUser,
  AiOutlinePlus,
} from "react-icons/ai";
import { FaRegListAlt } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { useLogOutUserMutation } from "../../app/sevices/user";
import Spinner from "../smallComponents/Spinner";

const UserOptions = ({ user }: { user: IUser | null }) => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const [logoutUser, { isLoading: loadingUser }] = useLogOutUserMutation();

  const dashBoard = () => {
    setOpen(false);
    navigate("/dashboard");
  };
  const account = () => {
    setOpen(false);
    navigate("/account");
  };
  const orders = () => {
    setOpen(false);
    navigate("/orders");
  };
  const login = () => {
    setOpen(false);
    navigate("/login");
  };
  const logOut = () => {
    setOpen(false);
    logoutUser();
    navigate("/");
  };
  return (
    <Dial>
      <button
        type="button"
        style={{ padding: user?.profilePic ? 0 : 10 }}
        onClick={() => setOpen(!open)}
      >
        {user ? (
          <img src={user.profilePic} alt="user" />
        ) : (
          <AiOutlinePlus size={24} />
        )}
      </button>
      {user ? (
        <OptionsContainer style={open ? {} : { height: 0 }}>
          {user.role === "admin" && (
            <div
              onClick={dashBoard}
              style={{
                transform: open ? "scale(100%)" : "scale(0%)",
              }}
            >
              <MdOutlineDashboard size={24} />
              <p>Dashboard</p>
            </div>
          )}
          <div
            onClick={orders}
            style={{
              transform: open ? "scale(100%)" : "scale(0%)",
            }}
          >
            <FaRegListAlt size={24} />
            <p>Orders</p>
          </div>
          <div
            onClick={account}
            style={{
              transform: open ? "scale(100%)" : "scale(0%)",
            }}
          >
            <AiOutlineUser size={24} />
            <p>Profile</p>
          </div>
          <div
            onClick={logOut}
            style={{
              transform: open ? "scale(100%)" : "scale(0%)",
            }}
          >
            {loadingUser ? <Spinner /> : <AiOutlineLogout size={24} />}
            <p>Logout</p>
          </div>
        </OptionsContainer>
      ) : (
        <OptionsContainer style={open ? {} : { height: 0 }}>
          <div
            onClick={login}
            style={{
              transform: open ? "scale(100%)" : "scale(0%)",
            }}
          >
            <AiOutlineLogin size={24} />
          </div>
        </OptionsContainer>
      )}
    </Dial>
  );
};

const Dial = styled.div`
  position: absolute;
  right: 2vh;
  top: 12vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  z-index: 10;
  button {
    background-color: #ebedf1;
    display: flex;
    border-radius: 50%;
    &:hover {
      box-shadow: 0 0 10px 1px grey;
    }
    img {
      border-radius: 50%;
      height: 50px;
      width: 50px;
      overflow: hidden;
      object-fit: cover;
    }
  }
`;

const OptionsContainer = styled.div`
  div {
    transition: transform 0.2s;
    background-color: #f6f9fd;
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;
    p {
      display: none;
      position: absolute;
      right: 50px;
      padding: 0.3rem;
      border-radius: 5px;
      background-color: #ebedf1;
    }
    &:hover {
      box-shadow: 0 0 10px 1px grey;
      background-color: #ebedf1;
      p {
        display: block;
        box-shadow: 0 0 10px 1px #747373;
      }
    }
    &:nth-child(2) {
      transition-delay: 100ms;
    }
    &:nth-child(3) {
      transition-delay: 200ms;
    }
    &:nth-child(4) {
      transition-delay: 300ms;
    }
  }
`;

export default UserOptions;
