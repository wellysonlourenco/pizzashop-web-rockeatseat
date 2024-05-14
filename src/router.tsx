import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./pages/_layouts/app";
import { AuthLayout } from "./pages/_layouts/auth";
import { Dashboard } from "./pages/app/dashboards";
import { SignIn } from "./pages/auth/sing-in";

export const router = createBrowserRouter([

  {
    path: "/",
    element: <AppLayout />,
    children: [{ path: "/", element: <Dashboard /> }],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [{ path: "/sing-in", element: <SignIn /> }],
  }

  //{ path: "/", element: <Dashboard /> },
  //{ path: "/sing-in", element: <SignIn /> }
]);
