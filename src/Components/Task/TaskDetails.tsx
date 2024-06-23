import React from "react";
import { Button, Card, Col, Row } from "antd";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../App/store";
import { useLocation, useNavigate } from "react-router-dom";

interface Task {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface TaskDetailsProps {
  task: Task;
}

const TaskDetails = () => {
  type AppDispatch = ThunkDispatch<any, any, AnyAction>;
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const task = location.state?.task;
  return (
    <Card title={<>Task Detail</>}>
      <Card title={task.name}>
        <p>Description: {task.description}</p>
        <p>Due Date: {new Date(task.due_date).toLocaleDateString()}</p>
        <p>
          Status: {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
        </p>
        <p>Project ID: {task.project_id}</p>
        <p>Created At: {new Date(task.created_at).toLocaleString()}</p>
        <p>Last Updated: {new Date(task.updated_at).toLocaleString()}</p>
      </Card>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        {" "}
        {/* Center align the button and provide spacing */}
        <Button danger onClick={() => navigate("/tasks")}>
          Go Back
        </Button>
      </div>
    </Card>
  );
};

export default TaskDetails;
