import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import { styles } from "../../Styles";
import auth from "@react-native-firebase/auth";
import Clipboard from "@react-native-clipboard/clipboard";
import { useUserData } from "../../hooks";

const ProfileForm = () => {
  const userData = useUserData();

  const onCopy = () => {
    Clipboard.setString(auth().currentUser.uid);
  };

  const alert = () => {
    Alert.alert("Log Out", "Are you sure you want to log out", [
      {
        text: "No",
      },
      {
        text: "Yes",
        onPress: async () => {
          await auth().signOut();
          Alert.alert("Log Out", "Logged out successfully");
        },
      },
    ]);
  };
  return (
    <View style={styles.profileContainer}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity>
          <View
            style={{
              backgroundColor: "#e7e7e7",
              top: 40,
              right: -10,
              position: "absolute",
              zIndex: 1000,
              padding: 15,
              borderRadius: 100,
            }}
          >
            <Image
              source={require("../../assets/edit-image.png")}
              style={{ width: 30, height: 30 }}
            />
          </View>
          <Image
            source={{ uri: userData.currenProfilePic }}
            style={styles.profilePic}
          />
        </TouchableOpacity>
        <View style={styles.profileUsernameContainer}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {userData.currentUsername}
          </Text>
        </View>
        <View style={{ position: "relative", top: 100, alignItems: "center" }}>
          <Text>{auth().currentUser.uid}</Text>
          <TouchableOpacity onPress={onCopy}>
            <Image
              source={require("../../assets/copy-link.png")}
              style={{ width: 30, height: 30, marginVertical: 10 }}
            />
          </TouchableOpacity>
          <Pressable style={styles.LogoutBtn} onPress={alert}>
            <Text style={{ fontWeight: "bold", color: "white", fontSize: 20 }}>
              Logout
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ProfileForm;

// const uploadFile = async (e) => {
//   await storage.ref(`uploads/${user}/profilePic.jpeg`).delete();
//   const file = Array.from(e.target.files)[0];
//   const extension = file.type.split("/")[1];
//   const ref = storage.ref(
//     `uploads/${auth.currentUser.uid}/profilePic.${extension}`
//   );
//   setUploding(true);
//   const task = ref.put(file);
//   task.on(STATE_CHANGED, (snapshot) => {
//     task
//       .then((d) => ref.getDownloadURL())
//       .then((url) => {
//         setDownloadURL(url);
//         setUploding(false);
//       });
//   });
//   await firestore
//     .collection("users")
//     .doc(user)
//     .set({
//       profilePic: `![alt](${downloadURL})`,
//     });
// };
