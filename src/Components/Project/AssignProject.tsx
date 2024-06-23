import { useDispatch, useSelector } from "react-redux";
import { Form, Select, Button, message, Row, Col, Card, Space } from "antd";
import {
  assignProject,
  fetchProjectsAgainstUser,
} from "../../Features/Project/projectSlice";
import { RootState } from "../../App/store";
import { useNavigate } from "react-router-dom";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

const AssignProject = () => {
  type AppDispatch = ThunkDispatch<any, any, AnyAction>;
  const dispatch: AppDispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const projects: any = useSelector(
    (state: RootState) => state.project.projects
  );
  const users: any = useSelector((state: RootState) => state.user.users);
  const onFinish = async (values: any) => {
    const { projectId, selectedUsers } = values;
    await assignProject({ projectId, userIds: selectedUsers })
      .then(() => {
        message.success("Project assigned successfully!");
        dispatch(fetchProjectsAgainstUser());
        form.resetFields();
      })
      .catch((error) => {
        message.error("Failed to assign project.");
        console.error(error);
      });
  };

  return (
    <Card>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="projectId"
          label="Select Project"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select a project">
            {projects.data.data?.map((project: any) => (
              <Select.Option key={project.id} value={project.id}>
                {project.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="selectedUsers"
          label="Select Users"
          rules={[{ required: true }]}
        >
          <Select mode="multiple" placeholder="Select users">
            {users?.data?.map((user: any) => (
              <Select.Option key={user.id} value={user.id}>
                {user.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Space size="middle">
            <Button type="primary" htmlType="submit">
              Assign Project
            </Button>
            <Button danger onClick={() => navigate("/projects")}>
              {"Cancel"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AssignProject;
