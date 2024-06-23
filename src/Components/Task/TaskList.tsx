import React, { useState } from "react";
import { List, Button, Select, message, Card, Col, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../App/store";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { deleteTask, fetchTasks } from "../../Features/Task/taskSlice";

interface Task {
  id: string;
  name: string;
  description: string;
}

const TaskList: React.FC = () => {
  type AppDispatch = ThunkDispatch<any, any, AnyAction>;
  const dispatch: AppDispatch = useDispatch();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>("");
  const projects: any = useSelector(
    (state: RootState) => state.project.projects
  );
  const projectsAgainstUser: any = useSelector(
    (state: RootState) => state.project.projectAgainstUser
  );
  const navigate = useNavigate();

  const handleProjectChange = (value: string) => {
    setSelectedProject(value);
  };

  const fetchTaskss = async () => {
    if (!selectedProject) {
      message.warning("Please select a project first");
      return;
    }
    try {
      const response = await dispatch(fetchTasks(selectedProject)).unwrap();
      setTasks(response.data);
    } catch (error) {
      message.error("Failed to fetch tasks due to an error");
      console.error(error);
    }
  };

  const handleDelete = (taskId: string) => {
    if (!selectedProject) {
      message.error("No project selected");
      return;
    }
    dispatch(deleteTask({ projectId: selectedProject, taskId }))
      .unwrap()
      .then(() => {
        message.success("Task deleted successfully");
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      })
      .catch((error) => {
        message.error("Failed to delete task");
        console.error("Delete task error:", error);
      });
  };
  const currentRole = localStorage.getItem("role") ?? "";
  return (
    <>
      <Card
        title={
          <>
            Task List
            {currentRole === "admin" && (
              <>
                {" "}
                <Button
                  type="primary"
                  onClick={() => navigate("/task-form")}
                  style={{ float: "right", marginLeft: "10px" }}
                >
                  Create Task
                </Button>
                <Button
                  type="primary"
                  onClick={() => navigate("/assign-task")}
                  style={{ float: "right" }}
                >
                  Assign Task
                </Button>
              </>
            )}
          </>
        }
      >
        <Select
          showSearch
          style={{ width: 200, marginBottom: 20 }}
          placeholder="Select a project"
          onChange={handleProjectChange}
          filterOption={(input, option: any) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
        >
          {currentRole && currentRole == "admin"
            ? projects?.data.data.map((project: any) => (
                <Select.Option key={project.id} value={project.id}>
                  {project.name}
                </Select.Option>
              ))
            : projectsAgainstUser?.map((project: any) => (
                <Select.Option key={project.id} value={project.id}>
                  {project.name}
                </Select.Option>
              ))}
        </Select>
        <Button type="primary" onClick={fetchTaskss} style={{ float: "right" }}>
          See Tasks
        </Button>
        <List
          itemLayout="horizontal"
          dataSource={tasks}
          renderItem={(task: Task) => (
            <List.Item
              actions={[
                <Button
                  type="link"
                  onClick={() =>
                    navigate(`/tasks/${task.id}`, {
                      state: { task: task },
                    })
                  }
                >
                  View
                </Button>,
                <Button
                  type="link"
                  onClick={() =>
                    navigate(`/task-form`, {
                      state: { task: task },
                    })
                  }
                >
                  Edit
                </Button>,
                <Button
                  type="link"
                  danger
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={task.name}
                description={task.description}
              />
            </List.Item>
          )}
        />
      </Card>
    </>
  );
};

export default TaskList;
