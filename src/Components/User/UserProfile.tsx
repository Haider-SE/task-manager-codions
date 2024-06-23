import React from "react";
import { Descriptions, Card, Row, Col } from "antd";

interface UserProfileProps {
  user: {
    name: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
}

const UserProfile: React.FC = () => {
  const user = {
    name: "",
    email: "",
    role: "",
    createdAt: "",
    updatedAt: "",
  };
  return (
    <Card title="User Profile" bordered={false}>
      <Descriptions bordered>
        <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
        <Descriptions.Item label="Role">{user.role}</Descriptions.Item>
        <Descriptions.Item label="Created At">
          {user.createdAt}
        </Descriptions.Item>
        <Descriptions.Item label="Updated At">
          {user.updatedAt}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default UserProfile;
