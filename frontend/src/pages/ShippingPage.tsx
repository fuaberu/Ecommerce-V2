import React, { useState } from "react";
import { Country, State, City } from "country-state-city";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setShipping } from "../app/slices/orderSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import { ActionButton } from "./ProductDetailePage";

const ShippingPage = () => {
  const { shippingInfo } = useSelector((state: RootState) => state.order);
  const { user } = useSelector((state: RootState) => state.user);

  const [country, setCountry] = useState<string>(shippingInfo?.country || "");
  const [state, setState] = useState<string>(shippingInfo?.state || "");
  const [city, setCity] = useState<string>(shippingInfo?.city || "");
  const [address, setAddress] = useState(shippingInfo?.address || "");
  const [zipCode, setZipCode] = useState(
    shippingInfo?.zipCode.toString() || ""
  );
  const [phone, setPhone] = useState(
    shippingInfo?.phoneNumber.toString() || ""
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!country || !state || !city || !zipCode || !phone) return;
    //add data check

    dispatch(
      setShipping({
        name: user?.name as string,
        shipping: {
          country,
          state,
          city,
          address,
          zipCode: parseInt(zipCode),
          phoneNumber: parseInt(phone),
        },
      })
    );
    navigate("/checkout/order");
  };

  return (
    <Container>
      <form onSubmit={(e) => onSubmit(e)} action="">
        <InputSelect
          name="country"
          required
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="">Country</option>
          {Country.getAllCountries().map((c, i) => (
            <option key={i} value={c.isoCode}>
              {c.name}
            </option>
          ))}
        </InputSelect>
        <InputSelect
          name="state"
          disabled={country ? false : true}
          required
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <option value="">State</option>
          {country &&
            State.getStatesOfCountry(country).map((s, i) => (
              <option key={i} value={s.isoCode}>
                {s.name}
              </option>
            ))}
        </InputSelect>
        <InputSelect
          name="city"
          disabled={country && state ? false : true}
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="">city</option>
          {country &&
            state &&
            City.getCitiesOfState(country, state).map((c, i) => (
              <option key={i} value={c.name}>
                {c.name}
              </option>
            ))}
        </InputSelect>
        <ShippingInput
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <ShippingInput
          type="text"
          placeholder="Pincode"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
        <ShippingInput
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <ActionButton type="submit">Continue</ActionButton>
      </form>
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem 10vw;
  form {
    display: flex;
    flex-direction: column;
  }
`;

const InputSelect = styled.select`
  padding: 0.5rem 1rem;
  margin: 5px 0;
  width: 100%;
  border: 1px solid #000;
  border-radius: 5px;
  outline: none;
  /* scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
    background-color: #f5f5f5;
  }
  ::-webkit-scrollbar-track {
    background-color: #f5f5f5;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #838383;
    border-radius: 3px;
  }
`;

const ShippingInput = styled.input`
  padding: 0.5rem 1rem;
  margin: 5px 0;
  width: 100%;
  border: 1px solid #000;
  border-radius: 5px;
  outline: none;
`;

export default ShippingPage;
