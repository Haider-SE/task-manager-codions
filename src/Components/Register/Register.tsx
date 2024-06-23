import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row } from "antd";
import { useNavigate } from "react-router-dom"; 
import { Typography } from "antd";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { register } from "../../Features/Register/registerSlice";
const { Title } = Typography;
const Register: React.FC = () => {
  type AppDispatch = ThunkDispatch<any, any, AnyAction>;
  const dispatch: AppDispatch = useDispatch();

  const onFinish = (values: any) => {
    dispatch(register(values))
      .unwrap()
      .then(() => {
        navigate("/tasks");
      })
      .catch((error) => {
        console.error("Failed to register:", error);
      });
  };
  const navigate = useNavigate();

  return (
    <Row
      align="middle"
      justify="center"
      style={{ minHeight: "100vh", padding: "20px" }}
    >
      <Col xs={24} sm={16} md={12} lg={8} xl={12}>
        <Card>
          <Title>Welcome to the Task Manager App by CodionsLab</Title>
          <Form
            name="normal_login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            className="login-form"
            layout="vertical"
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input
                size="large"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Name"
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input
                size="large"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                size="large"
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                block
                size="large"
              >
                Register
              </Button>
              <div className="text-center mt-4">
                Or{" "}
                <a
                  href=""
                  onClick={() => navigate("/Login")}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Login
                </a>
              </div>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Register;
