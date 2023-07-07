import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import LoadingScreen from "../components/LoadingScreen";

export default function GuestGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return <LoadingScreen />;
  }
  if (user) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
