import React from "react";
import { Button, Card, Col, List, Row, Table, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../App/store";
import {
  deleteProject,
  fetchProjects,
} from "../../Features/Project/projectSlice";

const ProjectList = () => {
  const projects: any = useSelector(
    (state: RootState) => state.project.projects
  );
  type AppDispatch = ThunkDispatch<any, any, AnyAction>;
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate(); 
  const columns = [
    {
      title: "Project Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: { id: any }) => (
        <>
          <Button
            type="link"
            onClick={() =>
              navigate(`/projectForm`, {
                state: { project: record },
              })
            }
          >
            Edit
          </Button>
          <Button
            type="link"
            onClick={() =>
              navigate(`/projects/${record.id}`, {
                state: { project: record },
              })
            }
          >
            View
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];
  const handleDelete = (projectId: number) => {
    deleteProject(projectId)
      .then(() => {
        message.success("Project deleted successfully");
        dispatch(fetchProjects());
     
      })
      .catch((error) => {
        message.error("Failed to delete project");
        console.error("Delete project error:", error);
      });
  };
  const handleCreateProject = () => {
    navigate("/projectForm");
  };
  return (
    <Card
      title={
        <>
          Projects List
          <Button
            type="primary"
            onClick={handleCreateProject}
            style={{ float: "right", marginLeft: "10px" }} 
          >
            Create Project
          </Button>
          <Button
            type="primary"
            onClick={() => {
              navigate("/assign-project");
            }}
            style={{ float: "right" }} 
          >
            Assign Project
          </Button>
        </>
      }
    >
      <Table dataSource={projects.data.data} columns={columns} rowKey="id" />
    </Card>
  );
};

export default ProjectList;
