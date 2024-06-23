import React from "react";
import { Table, Button, Card, Col, Row, message } from "antd";
import { UserListProps } from "../Login/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../App/store";
import { useNavigate } from "react-router-dom";

import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { deleteUser, fetchUsers } from "../../Features/Users/userSlice";

const UsersList: React.FC = () => {
  const responseData: any = useSelector((state: RootState) => state.user.users);
  type AppDispatch = ThunkDispatch<any, any, AnyAction>;
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const handleUpdate = (user: any) => {
    navigate("/user-form", { state: { user } });
  };

  const handleDelete = (userId: number) => {
    deleteUser(userId)
      .then(() => {
        dispatch(fetchUsers());
        message.success("User successfully deleted");
      })
      .catch((error) => {
        message.error("Failed to delete user");
        console.error("Delete user error:", error);
      });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "",
      key: "actions",
      render: (text: string, record: any) => (
        <Button danger onClick={() => handleDelete(record.id)}>
          Delete
        </Button>
      ),
    },
    {
      title: "",
      key: "actions",
      render: (text: string, record: any) => (
        <Button onClick={() => handleUpdate(record)}>Update</Button>
      ),
    },
  ];

  return (
    <>
      <Card
        title={
          <>
            Projects List
            <Button
              type="primary"
              onClick={() => {
                navigate("/user-form");
              }}
              style={{ float: "right", marginLeft: "10px" }}
            >
              Create a new User
            </Button>
          </>
        }
      >
        <Table dataSource={responseData.data} columns={columns} rowKey="id" />;
      </Card>
    </>
  );
};

export default UsersList;
