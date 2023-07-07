import React, { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import useAuth from "../hooks/useAuth";

type ViewModeContextType = {
  mode: "live-view" | "user-view";
};
export const ViewModeContext = createContext<ViewModeContextType>({
  mode: "live-view",
});
function ViewModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ViewModeContextType["mode"]>("live-view");
  const { pathname } = useLocation();
  // const userData = useAuth();

  useEffect(() => {
    // if (!!userData) {
    if (pathname === "/user-view") {
      setMode("user-view");
    } else {
      setMode("live-view");
    }
    // }
  }, [pathname]);
  return (
    <ViewModeContext.Provider value={{ mode }}>
      {children}
    </ViewModeContext.Provider>
  );
}

export default ViewModeProvider;
