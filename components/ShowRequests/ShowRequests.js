import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "../../Styles";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useUserData } from "../../hooks";
import { useNavigation } from "@react-navigation/native";

const ShowRequests = () => {
  return (
    <View>
      <SentRequests />
      <View style={{ borderBottomWidth: 1, borderBottomColor: "#b8b8b8" }} />
      <RecivedRequests />
    </View>
  );
};

const SentRequests = () => {
  const [sentRequests, setSentRequests] = useState([]);
  useEffect(() => {
    firestore()
      .collection("users")
      .doc(auth().currentUser.uid)
      .collection("sentRequests")
      .onSnapshot((snapshot) => {
        setSentRequests(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={{ fontWeight: "bold", fontSize: 20, marginHorizontal: 130 }}>
        Sent Requests
      </Text>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "black",
          marginHorizontal: 110,
          width: 180,
        }}
      />
      {sentRequests.length !== 0 ? (
        <>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View
              style={{ borderBottomWidth: 1, borderBottomColor: "#828282" }}
            />
            {sentRequests.map((doc, index) => (
              <SentRequestItem request={doc} key={index} />
            ))}
          </View>
        </>
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text>No outgoing requests</Text>
        </View>
      )}
    </View>
  );
};
const SentRequestItem = ({ request }) => {
  const { username, dummypfp } = request;
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={{ uri: dummypfp }} style={styles.chatProfilePic} />
        <Text style={{ fontWeight: "bold" }}>{username}</Text>
      </View>
    </View>
  );
};

const RecivedRequests = () => {
  const [recivedRequests, setRecivedRequests] = useState([]);
  useEffect(() => {
    firestore()
      .collection("users")
      .doc(auth().currentUser.uid)
      .collection("recivedRequests")
      .onSnapshot((snapshot) => {
        setRecivedRequests(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);
  return (
    <View style={{ marginTop: 10, flex: 1 }}>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 20,
          marginHorizontal: 120,
          width: 200,
        }}
      >
        Recived Requests
      </Text>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "black",
          marginHorizontal: 110,
          width: 180,
        }}
      />
      {recivedRequests.length !== 0 ? (
        <>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View
              style={{ borderBottomWidth: 1, borderBottomColor: "#828282" }}
            />
            {recivedRequests.map((doc, index) => (
              <RecivedRequestItem request={doc} key={index} />
            ))}
          </View>
        </>
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <Text>No incoming requests</Text>
        </View>
      )}
    </View>
  );
};

const RecivedRequestItem = ({ request }) => {
  const { username, profilePic, dummypfp, userId } = request;
  const userData = useUserData();
  const navigation = useNavigation();

  const acceptRequest = async () => {
    try {
      const currentUserRef = firestore()
        .collection("users")
        .doc(auth().currentUser.uid);
      //User reference of current user on firestore

      const sendersRef = firestore().collection("users").doc(userId);
      //Firestore reference of the user who sent the request

      await currentUserRef.collection("chats").doc(userId).set({
        username: username,
        userId: userId,
        profilePic: profilePic,
      });
      //Adding the senders document in chats collection of current users

      await sendersRef.collection("chats").doc(auth().currentUser.uid).set({
        username: userData.currentUsername,
        profilePic: userData.currenProfilePic,
        userId: auth().currentUser.uid,
      });
      //Adding the currentUser document in chats collection of the sender's document

      await currentUserRef.collection("recivedRequests").doc(userId).delete();
      //Deleting the senders document from the recivedRequest Collection from Current User

      await sendersRef
        .collection("sentRequests")
        .doc(auth().currentUser.uid)
        .delete();
      //Deleting the current user document from the senders sentRequests Collection

      navigation.push("HomeScreen");
      //Pushing to HomeScreen
    } catch (err) {
      console.error(err.message);
    }
  };

  const rejectUser = async (user) => {
    try {
      const currentUserRef = firestore()
        .collection("users")
        .doc(auth().currentUser.uid);
      //User reference of current user on firestore

      const sendersRef = firestore().collection("users").doc(userId);
      //Firestore reference of the user who sent the request

      await currentUserRef.collection("recivedRequests").doc(userId).delete();
      //Deleting the senders document from the recivedRequest Collection from Current User

      await sendersRef
        .collection("sentRequests")
        .doc(auth().currentUser.uid)
        .delete();
      //Deleting the current user document from the senders sentRequests Collection
    } catch (e) {
      console.error(e.message);
    }
  };
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={{ uri: dummypfp }} style={styles.chatProfilePic} />
        <Text style={{ fontWeight: "bold" }}>{username}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={acceptRequest}>
          <Image
            source={require("../../assets/confirm.png")}
            style={{ width: 50, height: 50, marginHorizontal: 5 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={rejectUser}>
          <Image
            source={require("../../assets/reject.png")}
            style={{ width: 50, height: 50, marginHorizontal: 5 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ShowRequests;
