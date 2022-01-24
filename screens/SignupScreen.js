import React from "react";
import { View, Image } from "react-native";
import { formStyles } from "../Styles";
import Signupform from "../components/signup/Signupform";

const SignupScreen = () => {
  return (
    <View style={formStyles.container}>
      <Image style={formStyles.logo} source={require("../assets/Logo.png")} />
      <Signupform />
    </View>
  );
};

export default SignupScreen;
