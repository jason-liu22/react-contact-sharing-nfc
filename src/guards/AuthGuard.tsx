import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
// pages
import Login from "../pages/Login";
import { auth } from "../firebase";
import LoadingScreen from "../components/LoadingScreen";
import AuthLayout from "../layouts/AuthLayout";
import useAuth from "../hooks/useAuth";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [user, loading] = useAuthState(auth);
  const userData = useAuth();
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState<null | string>(
    null
  );

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return (
      <AuthLayout>
        <Login />
      </AuthLayout>
    );
  }

  if (!userData) {
    return <LoadingScreen />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
