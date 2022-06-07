import * as React from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {doc, setDoc, getDoc, updateDoc} from "firebase/firestore";
import {auth, db} from "../firebase";

const userAuthContext = React.createContext();

export function UserAuthContextProvider({children}) {
  const [user, setUser] = React.useState({});
  const [userBookmarks, setUserBookmarks] = React.useState([]);
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password).then(async (data) => {
      await setDoc(doc(db, "users", data.user.uid), {
        email: data.user.email,
        bookmarks: [],
      });
    });
  }
  function logOut() {
    signOut(auth);
    location.reload();
  }

  async function saveBookmarks(bookmarks) {
    const userRef = doc(db, "users", user.id);
    await updateDoc(userRef, {
      bookmarks,
    });
  }

  async function manageBookmark(bookmarkAction, bookmark) {
    if (bookmarkAction === "add") {
      let newBookmarks = [...userBookmarks, bookmark];
      setUserBookmarks(newBookmarks);
      if (user.id) {
        await saveBookmarks(newBookmarks);
      }
    }
    if (bookmarkAction === "remove") {
      let newBookmarks = userBookmarks.filter((item) => item !== bookmark);
      setUserBookmarks(newBookmarks);
      if (user.id) {
        await saveBookmarks(newBookmarks);
      }
    }
  }

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentuser) => {
      let docRef;
      let docSnap;
      if (!currentuser) {
        setUser({});
        setUserBookmarks([]);
      } else {
        docRef = doc(db, "users", currentuser.uid);
        docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          let data = docSnap.data();
          setUser({id: docSnap.id, ...data});
          setUserBookmarks(data.bookmarks);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{
        user,
        userBookmarks,
        logIn,
        signUp,
        logOut,
        manageBookmark,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return React.useContext(userAuthContext);
}
