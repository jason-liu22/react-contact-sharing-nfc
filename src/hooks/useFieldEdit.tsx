import { useContext } from "react";
import { SingleFieldEditContext } from "../providers/SingleFieldEditProvider";

const useFieldEdit = () => useContext(SingleFieldEditContext);
export default useFieldEdit;
