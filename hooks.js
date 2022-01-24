import firestore from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";

// Custom hook to read  auth record and user profile doc
export function useUserData() {
  const [currentUsername, setCurrentUsername] = useState(null);
  const [currenProfilePic, setCurrenProfilePic] = useState(null);

  useEffect(async () => {
    const docRef = firestore().collection("users").doc(auth().currentUser.uid);
    await docRef.get().then((doc) => {
      if (doc.exists) {
        docRef.onSnapshot(async (doc) => {
          setCurrentUsername(doc.data()?.username);
          setCurrenProfilePic(doc.data().profilePic);
        });
      }
    });
  }, []);
  return { currentUsername, currenProfilePic };
}
