import React, { useState, useEffect } from "react";
import AuthNavigation from "./AuthNavigation";
import { MenuProvider } from "react-native-popup-menu";
import { UserContext } from "./Context";
import { StatusBar } from "expo-status-bar";
import { useUserData } from "./hooks";

export default function App() {
  const userData = useUserData();
  return (
    <UserContext.Provider value={userData}>
      <MenuProvider>
        <StatusBar style="auto" />
        <AuthNavigation />
      </MenuProvider>
    </UserContext.Provider>
  );
}
