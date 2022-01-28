import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import SideMenu from "../../components/dashboard/SideMenu";

const Dashboard = () => {
  return (
    <DashPage>
      <SideMenu />
      <Content>
        <Outlet />
      </Content>
    </DashPage>
  );
};

const DashPage = styled.div``;

const Content = styled.section`
  margin-left: 15vw;
`;

export default Dashboard;
