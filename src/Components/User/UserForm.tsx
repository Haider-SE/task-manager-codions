import React from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Card,
  Col,
  Row,
  Checkbox,
  Space,
  message,
} from "antd";
import { useDispatch } from "react-redux";
import {
  createUser,
  fetchUsers,
  updateUser,
} from "../../Features/Users/userSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

const UserForm: React.FC = () => {
  const [form] = Form.useForm();
  type AppDispatch = ThunkDispatch<any, any, AnyAction>;
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;
  const onFinish = (values: {
    name: string;
    email: string;
    role: string;
    password?: string;
    is_active: boolean;
  }) => {
    if (user) {
      updateUser({ id: user.id, userData: values })
        .then(() => {
          message.success("User Updated Successfully");
          dispatch(fetchUsers())
            .unwrap()
            .then(() => {
              navigate("/users");
            });
        })
        .catch((error) => console.error("Failed to update user:", error));
    } else {
      createUser(values)
        .then(() => {
          dispatch(fetchUsers());
          navigate("/users");
        })
        .catch((error) => console.error("Failed to create user:", error));
    }
  };

  React.useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        role: user.role,
        is_active: user.is_active === 1,
        password: "",
      });
    }
  }, [user, form]);

  return (
    <Card>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          name: "",
          email: "",
          role: "",
          password: "",
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please input the user's name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please input the email address!" },
            { type: "email", message: "The input is not valid E-mail!" },
          ]}
        >
          <Input />
        </Form.Item>
        {!user ? (
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: user ? false : true,
                message: "Please input the password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        ) : (
          <></>
        )}

        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: "Please select a role!" }]}
        >
          <Select placeholder="Select a role">
            <Select.Option value="user">User</Select.Option>
            <Select.Option value="admin">Admin</Select.Option>
          </Select>
        </Form.Item>
        {user ? (
          <Form.Item name="is_active" valuePropName="checked">
            <Checkbox>Active</Checkbox>
          </Form.Item>
        ) : (
          <></>
        )}
        <Form.Item>
          <Space size="middle">
            <Button type="primary" htmlType="submit">
              {user ? "Update" : "Submit"}
            </Button>
            <Button danger onClick={() => navigate("/users")}>
              {"Cancel"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default UserForm;
