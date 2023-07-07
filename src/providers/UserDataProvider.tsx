import { doc, onSnapshot } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { SingleField } from "../types";

export type UserDataContextType = {
  uid: string;
  name: string;
  email: string;
  avatar: string;
  color?: string;
  resume?: string;
  firstname?: string;
  lastname?: string;
  occupation?: string;
  company?: string;
  companylogo?: string;
  phone?: string;
  location?: string;
  website?: string;
  socials?: SingleField[];
};
export const AuthContext = createContext<UserDataContextType | undefined>(
  undefined
);

function UserDataProvider({ children }: { children: React.ReactNode }) {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState<UserDataContextType | undefined>(
    undefined
  );

  useEffect(() => {
    if (user) {
      const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
        // const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        setUserData(doc.data() as UserDataContextType);
        // if (source === "Local") {
        //   console.log("detect changes");
        // setUserData(doc.data());
        // }
      });
      return () => {
        unsub();
      };
    }
  }, [user]);

  return (
    <AuthContext.Provider value={userData}>{children}</AuthContext.Provider>
  );
}

export default UserDataProvider;
