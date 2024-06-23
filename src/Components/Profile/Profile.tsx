import React, { useState } from "react";
import { Form, Input, Button, Card, Row, Col, Descriptions } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../App/store";

const Profile = (profile: any) => {
  const responseData = useSelector((state: RootState) => state.profile.profile);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: responseData.data.name,
    email: responseData.data.email,
    password: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const saveProfile = async () => {
    try {
      const response = await axios.put("/api/profile/update", formData);
      console.log("Profile updated:", response.data);
      setIsEditing(false);
   
      setFormData((prev) => ({ ...prev, password: "" }));
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <Card
      title={isEditing ? "Edit Profile" : "User Profile"}
      bordered={false}
      style={{ width: "100%" }}
    >
      {!isEditing ? (
        <div>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Name">
              {responseData.data.name}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {responseData.data.email}
            </Descriptions.Item>
          </Descriptions>
          <div style={{ marginTop: "16px" }}>
            {" "}
            <Button type="primary" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          </div>
        </div>
      ) : (
        <Form layout="vertical" onFinish={saveProfile}>
          <Form.Item label="Name">
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item
            label="Password"
            help="Leave blank to keep the current password"
          >
            <Input.Password
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
            <Button
              onClick={() => setIsEditing(false)}
              style={{ marginLeft: 10 }}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      )}
    </Card>
  );
};

export default Profile;
