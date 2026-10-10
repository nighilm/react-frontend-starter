import { createBrowserRouter } from "react-router-dom";

import GuestRoute from "@/features/auth/GuestRoute";
import ProtectedRoute from "@/features/auth/ProtectedRoute";
import AppLayout from "@/layouts/AppLayout";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";

export const router = createBrowserRouter([
  {
    element: <GuestRoute />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
        ],
      },
    ],
  },
]);
