import React from "react";
import { View, ScrollView } from "react-native";
import Header from "../components/ShowRequests/Header";
import ShowRequests from "../components/ShowRequests/ShowRequests";

const ShowRequestsScreen = () => {
  return (
    <View>
      <Header />
      <ScrollView vertical>
        <ShowRequests />
      </ScrollView>
    </View>
  );
};

export default ShowRequestsScreen;
