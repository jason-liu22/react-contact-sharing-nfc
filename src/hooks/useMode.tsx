import { useContext } from "react";
import { ViewModeContext } from "../providers/ViewModeProvider";

const useMode = () => useContext(ViewModeContext);
export default useMode;
