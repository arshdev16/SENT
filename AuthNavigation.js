import React, { useState, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import { SignedInStack, SignedOutStack } from "./Stacks";

const AuthNavigation = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <>{user?<SignedInStack/> : <SignedOutStack/>}</>
  );
};

export default AuthNavigation;
