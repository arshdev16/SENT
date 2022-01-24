import { View, Text } from "react-native";
import React, { useState } from "react";
import Header from "../components/Chat/Header";
import Chats from "../components/Chat/Chats";

const ChatScreen = (user) => {
  const [reciverData, setReciverData] = useState(user.route.params.user);
  const { profilePic, userId, username } = reciverData;

  return (
    <View>
      <Header profilePic={profilePic} username={username} userId={userId} />
      <Chats profilePic={profilePic} username={username} userId={userId} />
    </View>
  );
};

export default ChatScreen;
