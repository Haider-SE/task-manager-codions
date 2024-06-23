import React, { useEffect, useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  UserOutlined,
  ProjectOutlined,
  CommentOutlined,
  TeamOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

const Navbar = () => {
  const [current, setCurrent] = useState("");
  const navigate = useNavigate(); 
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/Login");
  };
  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    switch (e.key) {
      case "logout":
        handleLogout();
        break;
      case "view-projects":
        navigate("/projects");
        break;
      case "create-project":
        navigate("/projectForm");
        break;
      case "view-tasks":
        navigate("/tasks");
        break;
      case "create-task":
        navigate("/task-form");
        break;
      case "view-comments":
        navigate("/comments");
        break;
      case "view-users":
        navigate("/users");
        break;
      case "create-user":
        navigate("/user-form");
        break;
      case "view-profile":
        navigate("/profile");
        break;
      case "assign-project":
        navigate("/assign-project");
        break;
      default:
        navigate("/tasks");
        break;
    }
  };
  const items: MenuItem[] = [
    {
      label: "Projects",
      key: "projects",
      icon: <ProjectOutlined />,
      children: [
        { label: "View Projects", key: "view-projects" },
        { label: "Create Project", key: "create-project" },
        { label: "Assign Project", key: "assign-project" },
      ],
    },
    {
      label: "Tasks",
      key: "tasks",
      icon: <AppstoreOutlined />,
      children: [
        { label: "View Tasks", key: "view-tasks" },
        { label: "Create Task", key: "create-task" },
      ],
    },
    {
      label: "Comments",
      key: "comments",
      icon: <CommentOutlined />,
      children: [{ label: "View Comments", key: "view-comments" }],
    },
    {
      label: "Users",
      key: "users",
      icon: <TeamOutlined />,
      children: [
        { label: "View Users", key: "view-users" },
        { label: "Create User", key: "create-user" },
      ],
    },
    {
      label: "Profile",
      key: "profile",
      icon: <UserOutlined />,
      children: [{ label: "View Profile", key: "view-profile" }],
    },
    {
      label: "More",
      key: "more",
      icon: <SettingOutlined />,
      children: [
        { label: "Settings", key: "settings" },
        { label: "Help", key: "help" },
      ],
    },
    {
      label: "Logout",
      key: "logout",
      icon: <LogoutOutlined />,
      onClick: () => handleLogout(),
    },
  ];
  const itemsForUser: MenuItem[] = [
    {
      label: "Tasks",
      key: "tasks",
      icon: <AppstoreOutlined />,
      children: [
        { label: "View Tasks", key: "view-tasks" },
        { label: "Create Task", key: "create-task" },
      ],
    },
    {
      label: "Profile",
      key: "profile",
      icon: <UserOutlined />,
      children: [{ label: "View Profile", key: "view-profile" }],
    },
    {
      label: "Logout",
      key: "logout",
      icon: <LogoutOutlined />,
      onClick: () => handleLogout(),
    },
  ];
  const currentRole = localStorage.getItem("role") ?? "";

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={currentRole && currentRole == "admin" ? items : itemsForUser}
    />
  );
};

export default Navbar;
