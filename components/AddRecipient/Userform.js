import React from "react";
import { useUserData } from "../../hooks";
import { View, TextInput, Text, Pressable, Alert } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { formStyles } from "../../Styles";
import { useNavigation } from "@react-navigation/native";
//imports

const AddRecipient = () => {
  const userData = useUserData();
  //Data of currently logged in user
  const formSchema = Yup.object().shape({
    sentcode: Yup.string().required("Please enter your friend's sentcode"),
  });
  //validation Schema
  const navigation = useNavigation();

  const addUser = async (sentcode) => {
    try {
      const currentUserRef = firestore()
        .collection("users")
        .doc(auth().currentUser.uid)
        .collection("sentRequests");
      //Document reference of currently loggedin user's sent request collection
      const docRef = firestore().collection("users").doc(sentcode);
      //Document reference of the user who is recieving the request

      docRef.get().then((doc) => {
        //Gettinng the recivers document data
        if (doc.exists && sentcode !== auth().currentUser.uid) {
          //If the reciver exists and the sentcode is not the same as the currently logged in user than do the following
          currentUserRef.doc(sentcode).set({
            userId: doc.data()?.userId,
            username: doc.data()?.username,
            dummypfp:
              "https://cdn.pixabay.com/photo/2015/04/18/11/03/profile-728591_1280.jpg",
            profilePic: doc.data()?.profilePic,
          });
          //Setting a document in the currentUserRef whose id is the uid of the recivers document
          docRef.collection("recivedRequests").doc(auth().currentUser.uid).set({
            username: userData.currentUsername,
            dummypfp:
              "https://cdn.pixabay.com/photo/2015/04/18/11/03/profile-728591_1280.jpg",
            userId: auth().currentUser.uid,
            profilePic: userData.currenProfilePic,
          });
          //Setting a document in the docRef's recived request collection whose document id is the same as the sender's document uid
          navigation.push("ShowRequestsScreen");
          //Pushing to ShowRequestsScreen
        } else {
          Alert.alert(
            "User not found",
            "The user you are trying to add is not registered",
            [
              {
                text: "Try again",
                style: "cancel",
              },
              {
                text: "Go back",
                onPress: () => {
                  navigation.goBack();
                },
              },
            ]
          );
          //If the condition fails then it shows as Alert
          console.error(err.message);
        }
      });
    } catch (e) {
      Alert.alert("A problem was encountered", e.message);
    }
  };
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
        Add User
      </Text>
      <Formik
        initialValues={{ sentcode: "" }}
        onSubmit={(values) => {
          addUser(values.sentcode);
        }}
        validationSchema={formSchema}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
          <>
            <View style={formStyles.container}>
              <View style={formStyles.inputContainer}>
                <Text style={{ fontWeight: "bold" }}>
                  Enter your friends hashcode
                </Text>
                <TextInput
                  style={[
                    formStyles.input,
                    {
                      borderColor: "#d6d6d6",
                    },
                  ]}
                  placeholderTextColor="#444"
                  placeholder="sentcode"
                  autoCapitalize="none"
                  autoFocus={true}
                  onChangeText={handleChange("sentcode")}
                  onBlur={handleBlur("sentcode")}
                  value={values.sentcode}
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
                  Add User
                </Text>
              </Pressable>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default AddRecipient;
