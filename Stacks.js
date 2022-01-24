import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignupScreen from "./screens/SignupScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import AddRecipient from "./screens/AddRecipient";
import ProfileScreen from "./screens/ProfileScreen";
import ShowRequestsScreen from "./screens/ShowRequestsScreen";
import ChatScreen from "./screens/ChatScreen";

const Stack = createStackNavigator();
const ScreenOptions = {
  headerShown: false,
};

export const SignedInStack = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={ScreenOptions}
    >
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="ShowRequestsScreen" component={ShowRequestsScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AddRecipient" component={AddRecipient} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export const SignedOutStack = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={ScreenOptions}
    >
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
