import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "../../Styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

const Header = () => {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <View style={{ flexDirection: "column", backgroundColor: "#343434" }}>
      <View style={styles.headerContainer}>
        <Text
          style={{
            color: "#ffffff",
            margin: 10,
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          SENT!!!
        </Text>
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
            <MenuOption onSelect={() => navigation.push("AddRecipient")}>
              <Text style={{ marginVertical: 10, fontSize: 15 }}>
                Add a User
              </Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <TouchableOpacity onPress={() => navigation.push("HomeScreen")}>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              margin: 5,
              paddingHorizontal: 15,
            }}
          >
            Chats
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            route.name === "ShowRequestsScreen"
              ? null
              : navigation.push("ShowRequestsScreen")
          }
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              margin: 5,
              paddingHorizontal: 15,
              fontWeight: "bold",
              borderBottomColor: "white",
              borderBottomWidth: 3,
            }}
          >
            Requests
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.push("ProfileScreen")}>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              margin: 5,
              paddingHorizontal: 15,
            }}
          >
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
