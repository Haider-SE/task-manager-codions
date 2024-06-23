import React from "react";
import { Button, Card, Col, List, Row, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const ProjectDetails = () => {
  const location = useLocation();
  const project = location.state?.project; 
  const navigate = useNavigate();
  if (!project) {
    return <p>No project data available</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      {project ? (
        <Card title={`Project: ${project.name}`}>
          <p>
            <strong>Description:</strong> {project.description}
          </p>
          <p>
            <strong>Active Status:</strong>{" "}
            {project.is_active ? "Active" : "Inactive"}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(project.created_at).toLocaleString()}
          </p>
          <p>
            <strong>Updated At:</strong>{" "}
            {new Date(project.updated_at).toLocaleString()}
          </p>

          <Typography.Title level={5}>Team Members:</Typography.Title>
          <List
            dataSource={project.users}
            renderItem={(user: any) => (
              <List.Item key={user.id}>
                <List.Item.Meta
                  title={user.name}
                  description={`Email: ${user.email}, Role: ${user.role}`}
                />
              </List.Item>
            )}
          />
        </Card>
      ) : (
        <p>No project data available.</p>
      )}
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        {" "}
        {/* Center align the button and provide spacing */}
        <Button danger onClick={() => navigate("/projects")}>
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default ProjectDetails;
