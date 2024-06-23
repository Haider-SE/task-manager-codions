import React, { useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Space,
  Card,
  message,
  Switch,
} from "antd";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createProject,
  fetchProjects,
  updateProject,
} from "../../Features/Project/projectSlice";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

const ProjectForm = () => {
  const [form] = Form.useForm();
  type AppDispatch = ThunkDispatch<any, any, AnyAction>;
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

 
  const project = location.state?.project;

  React.useEffect(() => {
    if (project) {
      form.setFieldsValue({
        name: project.name,
        description: project.description,
        is_active: project.is_active,
      });
    }
  }, [project, form]);

  const onFinish = async (values: any) => {
    const projectData = {
      name: values.name,
      description: values.description,
      is_active: values.is_active,
    };
    if (project) {
      updateProject({ projectId: project.id, projectData })
        .then(() => {
          message.success("Project updated successfully!");
          dispatch(fetchProjects());
          navigate("/projects");
        })
        .catch((error: any) => {
          console.error("Failed to update project:", error);
        });
    } else {
      try {
        const resultAction: any = await dispatch(createProject(values));
        if (createProject.fulfilled.match(resultAction)) {
          if (resultAction?.payload?.status === 201) {
            message.success(
              "Project created successfully with no content returned"
            );
            dispatch(fetchProjects());
            navigate("/projects");
          }
        }
      } catch (err: any) {
        message.error(`Error: ${err.message}`);
      }
    }
  };

  return (
    <Card>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{ name: "", description: "", is_active: false }}
      >
        <Form.Item
          name="name"
          label="Project Name"
          rules={[
            { required: true, message: "Please input the project name!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <Input.TextArea />
        </Form.Item>
        {project && (
          <Form.Item
            name="is_active"
            label="Active Status"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        )}

        <Space size="middle">
          <Button type="primary" htmlType="submit">
            {project ? "Update Project" : "Create Project"}
          </Button>
          <Button danger onClick={() => navigate("/projects")}>
            {"Cancel"}
          </Button>
        </Space>
      </Form>
    </Card>
  );
};

export default ProjectForm;
