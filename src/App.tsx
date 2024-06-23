import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Layout/Dashboard";
import { RouteItem, UserListProps } from "./Components/Login/utils";
import Login from "./Components/Login/Login";
import "./index.css";
import Register from "./Components/Register/Register";
import UsersList from "./Components/User/UsersList";
import UserForm from "./Components/User/UserForm";
import UserProfile from "./Components/User/UserProfile";
import ProjectList from "./Components/Project/ProjectList";
import ProjectForm from "./Components/Project/ProjectForm";
import ProjectDetails from "./Components/Project/PrrojectDetails";
import Unauthorized from "./Components/Unauthorized/Unauthorized";
import Profile from "./Components/Profile/Profile";
import TaskList from "./Components/Task/TaskList";
import AssignProject from "./Components/Project/AssignProject";
import TaskForm from "./Components/Task/TaskForm";
import TaskDetails from "./Components/Task/TaskDetails";
import AssignTask from "./Components/Task/AssignTask";
const arrayOfRoutesInitial: RouteItem[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
];

const arrayOfRoutes: RouteItem[] = [
  {
    path: "/users",
    element: <UsersList />,
  },
  {
    path: "/user-form",
    element: <UserForm />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/projects",
    element: <ProjectList />,
  },
  {
    path: "/projectForm",
    element: <ProjectForm />,
  },
  {
    path: "/projects/:projectId",
    element: <ProjectDetails />,
  },
  {
    path: "/assign-project",
    element: <AssignProject />,
  },
  {
    path: "/assign-task",
    element: <AssignTask />,
  },
  {
    path: "/tasks",
    element: <TaskList />,
  },
  {
    path: "/task-form",
    element: <TaskForm />,
  },
  {
    path: "/tasks/:taskId",
    element: <TaskDetails />,
  },
];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {arrayOfRoutes.map((route, idx) => (
          <Route
            key={idx}
            path={route.path}
            element={
              <Dashboard arrayOfRoutes={arrayOfRoutes}>
                {route.element}
              </Dashboard>
            }
          />
        ))}
        {arrayOfRoutesInitial.map((route, idx) => (
          <Route key={idx} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
