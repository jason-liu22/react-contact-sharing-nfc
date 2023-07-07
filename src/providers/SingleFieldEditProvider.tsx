import React, { createContext, useState } from "react";
import { SingleField } from "../types";

type SingleFieldEditContextType = {
  field: SingleField | null;
  updateField: (field: SingleField | null) => void;
};
export const SingleFieldEditContext = createContext<SingleFieldEditContextType>(
  {
    field: null,
    updateField: () => {},
  }
);

function SingleFieldEditProvider({ children }: { children: React.ReactNode }) {
  const [field, setField] = useState<SingleField | null>(null);

  const handleUpdateField = (field: SingleField | null) => {
    setField(field);
  };
  return (
    <SingleFieldEditContext.Provider
      value={{ field, updateField: handleUpdateField }}
    >
      {children}
    </SingleFieldEditContext.Provider>
  );
}

export default SingleFieldEditProvider;
