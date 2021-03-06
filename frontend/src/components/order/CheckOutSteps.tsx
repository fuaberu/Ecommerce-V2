import React, { Fragment } from "react";
import styled from "styled-components";
import { BsFillCartCheckFill } from "react-icons/bs";
import { MdLocalShipping, MdPayment } from "react-icons/md";
import { Outlet, useLocation } from "react-router-dom";

const CheckOutSteps = () => {
  let location = useLocation();
  const current = location.pathname.split("/").pop();
  console.log(current);
  return (
    <Fragment>
      <StepsContainer>
        <div>
          <MdLocalShipping size={24} style={{ fill: "tomato" }} />
          <h4>Shipping Detailes</h4>
        </div>
        <div>
          <BsFillCartCheckFill
            size={24}
            style={{
              fill:
                current === "payment" || current === "order"
                  ? "tomato"
                  : "black",
            }}
          />
          <h4>Confirm Order</h4>
        </div>
        <div>
          <MdPayment
            size={24}
            style={{
              fill: current === "payment" ? "tomato" : "black",
            }}
          />
          <h4>Payment</h4>
        </div>
      </StepsContainer>
      <Outlet />
    </Fragment>
  );
};
const StepsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding-top: 1rem;
  div {
    text-align: center;
    h4 {
      margin: 0.5rem;
    }
  }
`;
export default CheckOutSteps;
