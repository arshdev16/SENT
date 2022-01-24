import React, { useState, useEffect } from "react";
import { View, TextInput, Text, Pressable, Alert } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import Validator from "email-validator";
import firestore from "@react-native-firebase/firestore";
import { formStyles } from "../../Styles";
import { Auth } from "two-step-auth";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
//imports

const Signupform = () => {
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [otpForm, setOtpForm] = useState(false);
  //All the states required
  const setStates = (username, Email, Password) => {
    setUserName(username);
    setEmail(Email);
    setPassword(Password);
    setOtpForm(true);
  };
  //A function that helps to travel from Email form to OTP form
  const changeOtpFormState = () => {
    setOtpForm(false);
  };
  //A function that helps to travel from OTP form to Email form

  //The return checks if the OTP form state is true or false. If the state is false, it stays on the email form and if true, it navigates to the OTP form.
  return otpForm ? (
    <OtpForm
      username={userName}
      email={email}
      password={password}
      changeOtpFormState={changeOtpFormState}
    />
  ) : (
    <Registerform setStates={setStates} />
  );
};

const Registerform = ({ setStates }) => {
  const navigation = useNavigation();
  const formSchema = Yup.object().shape({
    email: Yup.string().email().required("Please enter your email address"),
    password: Yup.string()
      .required()
      .min(6, "Your password must be at least 6 characters long"),
    username: Yup.string()
      .required()
      .min(4, "Your username must be at least 4 characters long"),
  });
  //Form schema to for username, email and password fields

  return (
    <View style={formStyles.container}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "700",
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        Signup to Continue
      </Text>
      <Formik
        initialValues={{ email: "", password: "", username: "" }}
        onSubmit={async (values) => {
          setStates(values.username, values.email, values.password);

          // const createdUser = await auth().createUserWithEmailAndPassword(
          //   values.email,
          //   values.password
          // );

          // const userRef = firestore().collection("users");
          // await userRef.doc(createdUser.user.uid).set({
          //   username: values.username,
          //   email: createdUser.user.email,
          //   userId: createdUser.user.uid,
          //   profilePic:
          //     "https://cdn.pixabay.com/photo/2015/04/18/11/03/profile-728591_1280.jpg",
          // });
          // navigation.push("HomeScreen");
        }}
        validationSchema={formSchema}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
          <>
            <View style={formStyles.container}>
              <View style={formStyles.inputContainer}>
                <Text style={{ fontWeight: "bold" }}>
                  Enter your desired Username
                </Text>
                <TextInput
                  style={[
                    formStyles.input,
                    {
                      borderColor:
                        values.username.length > 4 ||
                        values.username.length === 0
                          ? "#d6d6d6"
                          : "red",
                    },
                  ]}
                  placeholderTextColor="#444"
                  placeholder="username"
                  autoCapitalize="none"
                  textContentType="username"
                  autoFocus={true}
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                />
              </View>
              <View style={formStyles.inputContainer}>
                <Text style={{ fontWeight: "bold" }}>Enter your E-mail</Text>
                <TextInput
                  style={[
                    formStyles.input,
                    {
                      borderColor:
                        values.email.length < 1 ||
                        Validator.validate(values.email)
                          ? "#d6d6d6"
                          : "red",
                    },
                  ]}
                  placeholderTextColor="#444"
                  placeholder="email"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  autoFocus={true}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
              </View>
              <View style={formStyles.inputContainer}>
                <Text style={{ fontWeight: "bold" }}>
                  Enter your desired Password
                </Text>
                <TextInput
                  style={[
                    formStyles.input,
                    {
                      borderColor:
                        values.password.length > 6 || values.password.length < 1
                          ? "#d6d6d6"
                          : "red",
                    },
                  ]}
                  placeholderTextColor="#444"
                  placeholder="Password"
                  autoCapitalize="none"
                  secureTextEntry={true}
                  autoCorrect={false}
                  textContentType="password"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
              </View>

              <Pressable
                disabled={!isValid}
                style={formStyles.blackBtns}
                onPress={handleSubmit}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "700",
                    alignItems: "center",
                    color: "white",
                  }}
                >
                  Sign up
                </Text>
              </Pressable>
              <Text style={{ marginTop: 10 }}>
                <Text style={{ fontWeight: "bold" }}>
                  Already have an account?{" "}
                </Text>

                <Text
                  style={{ fontWeight: "bold", color: "blue" }}
                  onPress={() => navigation.push("LoginScreen")}
                >
                  {" "}
                  Login
                </Text>
              </Text>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

const OtpForm = ({ username, email, password, changeOtpFormState }) => {
  const navigation = useNavigation();
  const [otpObj, setOtpObj] = useState({});
  // A state to save the otpObj recived from the two-step-auth module.

  const signUpWithFirebase = async (username, email, password, otp) => {
    try {
      if (email === otpObj.mail && parseInt(otp) === otpObj.OTP) {
        //If the email is still same as the email the OTP was sent to and the entered OTP is same as the OTP which was sent, it registers a new user
        const createdUser = await auth().createUserWithEmailAndPassword(
          email,
          password
        );

        const userRef = firestore().collection("users");
        await userRef.doc(createdUser.user.uid).set({
          username: username,
          email: createdUser.user.email,
          userId: createdUser.user.uid,
          profilePic:
            "https://cdn.pixabay.com/photo/2015/04/18/11/03/profile-728591_1280.jpg",
        });
        navigation.push("HomeScreen");
      } else {
        // Else it throws an error.
        Alert.alert(
          "The OTP you entered was incorrect",
          "\n\n Please Try again",
          [
            {
              text: "Try again",
              style: "cancel",
            },
            {
              text: "Login",
              onPress: () => {
                navigation.push("LoginScreen");
              },
            },
          ]
        );
      }
    } catch (err) {
      // If any problems are encountered, It throws an alert.
      Alert.alert("A problem was encountered", err.message, [
        {
          text: "Try again",
          style: "cancel",
        },
        // {
        //   text: "Already have an account?",

        // }
      ]);
      console.error(err.message);
    }
  };

  useEffect(async () => {
    const res = await Auth(email, "Sent!!!");
    setOtpObj(res);
    // Sends an OTP to the given email address
  }, []);

  return (
    <View style={formStyles.container}>
      <Formik
        initialValues={{ OTP: null }}
        onSubmit={(values) =>
          signUpWithFirebase(username, email, password, values.OTP)
        }
      >
        {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
          <>
            <View style={formStyles.container}>
              <Text style={{ fontWeight: "bold" }}>Enter OTP</Text>
              <TextInput
                placeholder="OTP"
                style={formStyles.input}
                placeholderTextColor="#444"
                autoCapitalize="none"
                keyboardType="numeric"
                textContentType="oneTimeCode"
                autoFocus={true}
                onChangeText={handleChange("OTP")}
                onBlur={handleBlur("OTP")}
                value={values.OTP}
                maxLength={6}
              />
              <View style={formStyles.btnsContainer}>
                <Pressable
                  disabled={!isValid}
                  style={formStyles.blackBtns}
                  onPress={changeOtpFormState}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "700",
                      alignItems: "center",
                      color: "white",
                    }}
                  >
                    Go Back
                  </Text>
                </Pressable>
                <Pressable
                  disabled={!isValid}
                  style={formStyles.blackBtns}
                  onPress={handleSubmit}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "700",
                      alignItems: "center",
                      color: "white",
                    }}
                  >
                    Sign up
                  </Text>
                </Pressable>
              </View>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default Signupform;
