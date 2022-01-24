import React from "react";
import { View, Image } from "react-native";
import { formStyles } from "../Styles";
import Loginform from '../components/login/Loginform'

const SignupScreen = () => {
  return (
    <View style={formStyles.container}>
      <Image style={formStyles.logo} source={require("../assets/Logo.png")} />
      <Loginform />
    </View>
  );
};

export default SignupScreen;
