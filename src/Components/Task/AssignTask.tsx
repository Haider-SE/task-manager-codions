import React, { useState, useEffect } from "react";
import { Form, Button, Select, message, Col, Card, Row, Space } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../App/store";
import { fetchTasks, assignTask } from "../../Features/Task/taskSlice";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

const AssignTask = () => {
  type AppDispatch = ThunkDispatch<any, any, AnyAction>;
  const dispatch: AppDispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const tasks: any = useSelector((state: RootState) => state.tasks.tasks);
  const users: any = useSelector((state: RootState) => state.user.users);
  const projects: any = useSelector(
    (state: RootState) => state.project.projects
  );
  const [selectedProject, setSelectedProject] = useState<string>();

  useEffect(() => {
    if (selectedProject) {
      dispatch(fetchTasks(selectedProject));
    }
  }, [dispatch, selectedProject]);

  const onFinish = async (values: any) => {
    const { selectedTask, selectedUsers } = values;
    try {
      const response = await axios.post(
        `https://task-manager.codionslab.com/api/v1/project/${selectedProject}/task/${selectedTask}/assign`,
        {
          assignee_id: selectedUsers,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        message.success("Task assigned successfully!");
        form.resetFields();
      } else {
        throw new Error("Failed to assign task");
      }
    } catch (error) {
      message.error("Failed to assign task.");
      console.error(error);
    }
  };

  return (
    <Card>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="selectedProject"
          label="Select Project"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select a project" onChange={setSelectedProject}>
            {/* Assuming projects are fetched and stored in redux */}
            {projects.data.data?.map((project: any) => (
              <Select.Option key={project.id} value={project.id}>
                {project.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="selectedTask"
          label="Select Task"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select a task">
            {tasks?.data?.map((task: any) => (
              <Select.Option key={task.id} value={task.id}>
                {task.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="selectedUsers"
          label="Assign to User"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select users">
            {users?.data.map((user: any) => (
              <Select.Option key={user.id} value={user.id}>
                {user.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Space size="middle">
            <Button type="primary" htmlType="submit">
              Assign Task
            </Button>
            <Button danger onClick={() => navigate("/projects")}>
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AssignTask;
