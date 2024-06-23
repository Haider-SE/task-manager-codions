import React, { useEffect } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  message,
  Row,
  Col,
  Card,
  Space,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { RootState } from "../../App/store";
import {
  createTask,
  updateTask,
  fetchTasks,
} from "../../Features/Task/taskSlice";
import moment from "moment";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";

const TaskForm = () => {
  const [form] = Form.useForm();
  type AppDispatch = ThunkDispatch<any, any, AnyAction>;
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const projects: any = useSelector(
    (state: RootState) => state.project.projects
  );
  const task = location.state?.task; 

  useEffect(() => {
    if (task) {
      form.setFieldsValue({
        projectId: task.projectId,
        name: task.name,
        description: task.description,
        due_date: task.due_date ? moment(task.due_date) : null,
        status: task.status,
      });
    }
  }, [task, form]);

  const onFinish = async (values: any) => {
    const formattedValues = {
      ...values,
      due_date: values.due_date ? values.due_date.format("YYYY-MM-DD") : null,
    };

    if (task) {

      updateTask({ taskId: task.id, task: formattedValues })
        .then(() => {
          message.success("Task updated successfully!");
          navigate("/tasks");
        })
        .catch((error) => {
          console.error("Failed to update task:", error);
          message.error("Failed to update task");
        });
    } else {
      createTask(formattedValues)
        .then(() => {
          message.success("Task created successfully!");
          navigate("/tasks");
        })
        .catch((error) => {
          console.error("Failed to create task:", error);
          message.error("Failed to create task");
        });
    }
  };

  return (
    <Card title={task ? "Edit Task" : "Create Task"}>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="projectId"
          label="Project"
          rules={[{ required: true, message: "Please select a project!" }]}
        >
          <Select placeholder="Select a project">
            {projects?.data.data.map((project: any) => (
              <Select.Option key={project.id} value={project.id}>
                {project.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="name"
          label="Task Name"
          rules={[{ required: true, message: "Please input the task name!" }]}
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
        <Form.Item name="due_date" label="Due Date">
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item name="status" label="Status" rules={[{ required: true }]}>
          <Select placeholder="Select status">
            <Select.Option value="todo">To Do</Select.Option>
            <Select.Option value="in_progress">In Progress</Select.Option>
            <Select.Option value="completed">Completed</Select.Option>
          </Select>
        </Form.Item>
        <Space size="middle">
          <Button type="primary" htmlType="submit">
            {task ? "Update Task" : "Create Task"}
          </Button>
          <Button danger onClick={() => navigate("/tasks")}>
            Cancel
          </Button>
        </Space>
      </Form>
    </Card>
  );
};

export default TaskForm;
