import { useContext } from "react";
import { AuthContext } from "../providers/UserDataProvider";

const useAuth = () => useContext(AuthContext);

export default useAuth;
