import React, { useState, useEffect, useContext, createContext } from "react";
import { auth, googleAuthProvider } from "./firebase";
import { createUser } from "./db";
import { useRouter } from "next/router";

const authContext = createContext();

export const useAuth = () => useContext(authContext);

export const AuthProvider = ({ children }) => {
  const value = useProvideAuth();
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

const formatUser = async (user) => {
  const token = await user.getIdToken();
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    token,
  };
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleUser = async (rawUser) => {
    if (rawUser) {
      // User is signed in.
      const user = await formatUser(rawUser);
      // eslint-disable-next-line
      const { token, ...userWithoutToken } = user;

      createUser(user.uid, userWithoutToken);
      setUser(user);

      setLoading(false);
      return user;
    } else {
      // No user is signed in.
      setUser(null);

      setLoading(false);
      return false;
    }
  };

  const signInWithGoogle = (redirect) => {
    setLoading(true);
    return auth.signInWithPopup(googleAuthProvider).then((response) => {
      handleUser(response.user);

      if (redirect) {
        router.push(redirect);
      }
    });
  };

  const signOut = () => {
    auth.signOut().then(() => handleUser(false));
  };

  useEffect(() => {
    // observer is only triggered on sign-in or sign-out.
    const unsubscribe = auth.onAuthStateChanged((user) => {
      handleUser(user);
    });
    return () => unsubscribe();
  }, []);

  return { user, loading, signInWithGoogle, signOut };
}
