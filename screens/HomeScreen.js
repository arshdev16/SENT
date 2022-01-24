import React from "react";
import { View } from "react-native";
import Header from "../components/Home/Header";
import Users from "../components/Home/Users";

const HomeScreen = () => {

  return (
    <View>
      <Header />
      <Users />
    </View>
  );
};

export default HomeScreen;
