import React from "react";
import { View } from "react-native";
import Header from "../components/Profile/Header";
import ProfileForm from "../components/Profile/ProfileForm";

const ProfileScreen = () => {
  return (
    <View>
      <Header />
      <ProfileForm />
    </View>
  );
};

export default ProfileScreen;
