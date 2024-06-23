import React, { ReactNode, useEffect, useState } from "react";
import { Col, Row } from "antd";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { fetchUserProfile } from "../../Features/Profile/profileSlice";
import { fetchUsers } from "../../Features/Users/userSlice";
import {
  fetchProjects,
  fetchProjectsAgainstUser,
} from "../../Features/Project/projectSlice";

interface RouteItem {
  path: string;
  element: ReactNode;
}

interface DashboardProps {
  children?: ReactNode;
  arrayOfRoutes: RouteItem[];
}

const Dashboard: React.FC<DashboardProps> = ({ arrayOfRoutes, children }) => {
  const currentToken = localStorage.getItem("token") ?? "";
  const isLoggedIn = currentToken ? true : false;
  const navigate = useNavigate();
  type AppDispatch = ThunkDispatch<any, any, AnyAction>;
  const dispatch: AppDispatch = useDispatch();

  const fetchTaskManagerAdminAppData = async () => {
    const data = await Promise.all([
      dispatch(fetchUserProfile(currentToken)),
      dispatch(fetchUsers()),
      dispatch(fetchProjects()),
      dispatch(fetchProjectsAgainstUser()),
    ]);
  };
  const fetchTaskManagerUserAppData = async () => {
    const dataUser = await Promise.all([
      dispatch(fetchUserProfile(currentToken)),
      dispatch(fetchProjectsAgainstUser()),
    ]);
  };
  useEffect(() => {
    if (localStorage.getItem("role") === "admin") {
      fetchTaskManagerAdminAppData();
    } else {
      fetchTaskManagerUserAppData();
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) navigate("/unauthorized");
  }, []);

  return (
    <div>
      {isLoggedIn && (
        <div>
          <Navbar />
        </div>
      )}
      <Row
        align="middle"
        justify="center"
        style={{ minHeight: "100vh", padding: "20px" }}
      >
        <Col xs={24} sm={16} md={12} lg={8} xl={12}>
          {children}{" "}
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
