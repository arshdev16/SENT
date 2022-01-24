import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "../../Styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

const Header = ({ profilePic, userId, username }) => {
  const navigation = useNavigation();

  const removeUser = async () => {
    try {
      await firestore()
        .collection("users")
        .doc(auth().currentUser.uid)
        .collection("chats")
        .doc(userId)
        .delete();
      await firestore()
        .collection("users")
        .doc(userId)
        .collection("chats")
        .doc(auth().currentUser.uid)
        .delete();

      navigation.push("HomeScreen");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <View style={{ flexDirection: "column", backgroundColor: "#383838" }}>
      <View style={[styles.headerContainer, { marginVertical: 10 }]}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require("../../assets/back.png")}
              style={{ width: 50, height: 50 }}
            />
          </TouchableOpacity>
          <Image source={{ uri: profilePic }} style={styles.chatProfilePic} />
          <Text style={{ fontWeight: "bold", color: "white" }}>{username}</Text>
        </View>
        <Menu>
          <MenuTrigger>
            <Image
              source={{
                uri: "https://img.icons8.com/ios-glyphs/344/ffffff/menu-2.png",
              }}
              style={styles.dots}
            />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption onSelect={removeUser}>
              <Text style={{ marginVertical: 10, fontSize: 15 }}>
                Remove User
              </Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
};

export default Header;
