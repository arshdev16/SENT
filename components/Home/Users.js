import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { styles } from "../../Styles";
import { useNavigation } from "@react-navigation/native";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    firestore()
      .collection("users")
      .doc(auth().currentUser.uid)
      .collection("chats")
      .onSnapshot((snapshot) => {
        setUsers(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);
  return (
    <View>
      {users.map((user) => (
        <ListItem user={user} key={user.userId} />
      ))}
    </View>
  );
};

const ListItem = ({ user }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.push("ChatScreen", { user: user })}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <Image
          source={{ uri: user.profilePic }}
          style={styles.chatProfilePic}
        />
        <Text>{user.username}</Text>
      </View>
      <View style={{ borderBottomWidth: 1, borderBottomColor: "#838383" }} />
    </TouchableOpacity>
  );
};

export default Users;
