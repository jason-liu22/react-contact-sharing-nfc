import { v4 as uuidv4 } from "uuid";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updatePassword,
  deleteUser,
  reauthenticateWithCredential,
  signOut,
  AuthError,
  EmailAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { firebaseConfig } from "../constant";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const logInWithEmailAndPassword = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
  // try {
  //   await signInWithEmailAndPassword(auth, email, password);
  // } catch (err: any) {
  //   console.error(err);
  //   alert(err.message);
  // }
};
const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
) => {
  return createUserWithEmailAndPassword(auth, email, password).then(
    ({ user }) => {
      setDoc(doc(db, "users", user.uid), {
        name,
        email,
        color: "#7B61FF",
        uid: user.uid,
        authProvider: "local",
      });
    }
  );
  // try {
  //   const res = await createUserWithEmailAndPassword(auth, email, password);
  //   const user = res.user;
  //   // await addDoc(collection(db, "users"), {
  //   //   uid: user.uid,
  //   //   name,
  //   //   authProvider: "local",
  //   //   email,
  //   // });
  //   await setDoc(doc(db, "users", user.uid), {
  //     name,
  //     email,
  //     color: "#7B61FF",
  //     uid: user.uid,
  //     authProvider: "local",
  //   });
  // } catch (err: any) {
  //   console.error(err);
  //   alert(err.message);
  // }
};

const updateFieldOnUserDocument = async (
  uid: string,
  fieldName: string,
  value: string
) => {
  try {
    const userRef = doc(db, "users", uid);
    return updateDoc(userRef, { [fieldName]: value });
  } catch (err: any) {
    console.error(err);
  }
};

const updateSocialArrayFieldOnUserDocument = async (
  uid: string,
  name: string,
  value: string,
  label: string
) => {
  try {
    const userRef = doc(db, "users", uid);
    return updateDoc(userRef, { socials: arrayUnion({ name, value, label }) });
  } catch (err: any) {
    console.error(err);
  }
};

const deleteSocialItemOnUserDocument = async (
  uid: string,
  name: string,
  value: string,
  label: string
) => {
  try {
    const userRef = doc(db, "users", uid);
    return updateDoc(userRef, { socials: arrayRemove({ name, value, label }) });
  } catch (err: any) {
    console.error(err);
  }
};

const getUserDocument = async (uid: string) => {
  try {
    console.log("called: ");
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      return null;
    }
  } catch (err: any) {
    console.log("get user document error: ", err);
  }
};

const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent. please check it");
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};

const changePassword = async (password: string, newPassword: string) => {
  const user = auth.currentUser;
  if (user) {
    return updatePassword(user, newPassword)
      .then(() => {
        // Update successful.
        console.log("updated password successfully");
      })
      .catch((error) => {
        console.log("password updating error: ", error);
        const credential = EmailAuthProvider.credential(
          user.email as string,
          password
        );
        reauthenticateWithCredential(user, credential)
          .then(() => {
            console.log("re-authenticated");
            changePassword(password, newPassword);
          })
          .catch((error) => {
            console.error("re-authenticating error");
          });
      });
  }
};

const removeUser = async (password: string) => {
  const user = auth.currentUser;
  if (!!user) {
    console.log("delete called");
    deleteUser(user)
      .then(() => {
        console.log("deleted");
      })
      .catch((error) => {
        console.log("delete error: ", error);
        const credential = EmailAuthProvider.credential(
          user.email as string,
          password
        );
        reauthenticateWithCredential(user, credential)
          .then(() => {
            console.log("re-authenticated");
            removeUser(password);
          })
          .catch((error) => {
            console.error("re-authenticating error");
          });
      });
  }
};

const uploadFile = async (
  file: File,
  uid: string,
  fieldName: string,
  callback: (url: string) => void
) => {
  const storage = getStorage();
  const storageRef = ref(storage, `${uuidv4()}.png`);

  // 'file' comes from the Blob or File API
  return uploadBytes(storageRef, file).then((snapshot) => {
    getDownloadURL(snapshot.ref).then((downloadURL) => {
      updateFieldOnUserDocument(uid, fieldName, downloadURL).then((r) => {
        console.log("successfully uploaded");
        callback(downloadURL);
      });
    });
  });
};

const logout = () => {
  signOut(auth);
};
export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  updateFieldOnUserDocument,
  deleteSocialItemOnUserDocument,
  updateSocialArrayFieldOnUserDocument,
  getUserDocument,
  changePassword,
  removeUser,
  uploadFile,
};
