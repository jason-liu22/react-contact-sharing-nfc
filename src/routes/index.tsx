import { Navigate, useRoutes } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import LiveView from "../pages/LiveView";
import Register from "../pages/Register";
import SocialList from "../pages/SocialList";
import EditView from "../pages/EditView";
import AccountSetting from "../pages/AccountSetting";
import PublicView from "../pages/PublicView";
import GuestGuard from "../guards/GuestGuard";

function MainRoutes() {
  const routes = useRoutes([
    {
      path: "auth",
      element: (
        <GuestGuard>
          <AuthLayout />
        </GuestGuard>
      ),
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
      ],
    },
    {
      path: "card/:uid",
      element: <PublicView />,
    },
    {
      path: "",
      element: <MainLayout />,
      children: [
        { path: "", element: <Navigate to="/live-view" /> },
        { path: "live-view", element: <LiveView /> },
        { path: "user-view", element: <LiveView /> },
        { path: "add-social-links", element: <SocialList /> },
        { path: "edit", element: <EditView /> },
        { path: "setting", element: <AccountSetting /> },
      ],
    },
  ]);
  return routes;
}

export default MainRoutes;
