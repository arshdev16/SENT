import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { styles } from "../../Styles";

const Chats = ({ profilePic, userId, username }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    try {
      firestore()
        .collection("users")
        .doc(auth().currentUser.uid)
        .collection("chats")
        .doc(userId)
        .collection("messages")
        .orderBy("createdAt", "desc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    } catch (err) {
      console.error(err.message);
    }
  }, []);

  return (
    <View style={{ height: "100%", flexDirection: "row", marginVertical: 10 }}>
      <View style={{ flexDirection: "column", flex: 1 }}>
        {messages.map((message, index) =>
          message.sent === true ? (
            <View key={index}>
              <MessageItem message={message} msgClassName={"sent"} />
            </View>
          ) : (
            <View key={index}>
              <MessageItem
                key={index}
                message={message}
                msgClassName={"recived"}
              />
            </View>
          )
        )}
      </View>
    </View>
  );
};

const MessageItem = ({ message, msgClassName }) => {
  const createdAt =
    typeof message?.createdAt === "number"
      ? new Date(message.creatAt)
      : message.createdAt.toDate();

  return (
    <View
      style={
        msgClassName === "sent" ? styles.sentMessage : styles.recivedMessage
      }
    >
      <Text style={{ color: "white", fontWeight: "600" }}>
        {message.message}
      </Text>
      <Text
        style={
          msgClassName === "sent"
            ? { alignSelf: "flex-start", color: "white", fontSize: 12 }
            : { alignSelf: "flex-end", color: "white", fontSize: 12 }
        }
      >
        {createdAt.toLocaleTimeString()}
      </Text>
    </View>
  );
};

export default Chats;
