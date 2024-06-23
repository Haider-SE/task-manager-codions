import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { login } from "../../Features/Login/loginSlice";

const { Title } = Typography;

const Login: React.FC = () => {
  const navigate = useNavigate();
  type AppDispatch = ThunkDispatch<any, any, AnyAction>;
  const dispatch: AppDispatch = useDispatch();

  const onFinish = (values: { email: string; password: string }) => {
    dispatch(login(values))
      .unwrap()
      .then(() => {
        navigate("/tasks");
      })
      .catch((error) => {
        console.error("Failed to login:", error);
      });
  };

  return (
    <Row
      align="middle"
      justify="center"
      style={{ minHeight: "100vh", padding: "20px" }}
    >
      <Col xs={24} sm={16} md={12} lg={8} xl={6}>
        <Card>
          <Title level={2}>Welcome to the Task Manager App by CodionsLab</Title>
          <Form
            name="normal_login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            className="login-form"
            layout="vertical"
          >
            <Form.Item
              name="email" 
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input
                size="large"
                prefix={<UserOutlined />}
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
                prefix={<LockOutlined />}
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
                Log in
              </Button>
              <div className="text-center mt-2">
                Or{" "}
                <a
                  href=""
                  onClick={() => navigate("/register")}
                  className="text-blue-500 hover:text-blue-700"
                >
                  register now!
                </a>
              </div>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
