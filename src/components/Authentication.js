import React, {createContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '1073532905276-54o3rkkgo5ifis8689nloaeujbcferve.apps.googleusercontent.com',
});

const user = null;

export const AuthContext = createContext({
  user,
  setUser: () => {},
});

export const AuthProvider = ({children}) => {
  // initialization state while connecting to firebase & retrieving auth state
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // handle user auth changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    return auth().onAuthStateChanged(onAuthStateChanged); // unsubscribe on unmount (asynchronously run)
  });

  // block rendering while auth state not yet determined
  if (initializing) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
