import { ReactNode } from "react";

export interface RouteItem {
  path: string;
  element: ReactNode;
}

export interface DashboardProps {
  children?: ReactNode;
  arrayOfRoutes: RouteItem[];
}

export interface UserListProps {
  users?: Array<{
    id: number;
    name: string;
    email: string;
    role: string;
    createdAt: string;
  }>;
  onDelete?: any;
}
