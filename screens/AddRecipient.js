import React from "react";
import { View, Image } from "react-native";
import Userform from "../components/AddRecipient/Userform";
import { styles } from "../Styles";
import { StatusBar } from "expo-status-bar";

const AddRecipient = () => {
  return (
    <View style={styles.container}>
      <StatusBar />
      <Image style={styles.logo} source={require("../assets/Logo.png")} />
      <Userform />
    </View>
  );
};

export default AddRecipient;
