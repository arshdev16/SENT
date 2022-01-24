import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ebe9e9",
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "100%",
    height: 90,
    flexDirection: "row",
  },
  dots: {
    width: 35,
    height: 35,
    margin: 10,
  },
  requestContainer: {
    flex: 1,
    backgroundColor: "#ebe9e9",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  profilePic: {
    width: 200,
    height: 200,
    top: 50,
    borderRadius: 100,
    borderColor: "#000000",
    borderWidth: 2,
  },
  profileUsernameContainer: {
    position: "relative",
    top: 90,
  },
  chatProfilePic: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "black",
  },
  LogoutBtn: {
    backgroundColor: "#000",
    padding: 13,
    borderRadius: 10,
    position: "absolute",
    top: 250,
  },
  sentMessage: {
    alignItems: "flex-end",
    alignSelf: "flex-end",
    backgroundColor: "#375ed3",
    padding: 15,
    borderRadius: 50,
    marginHorizontal: 10,
    marginVertical: 5
  },
  recivedMessage: {
    alignItems: "flex-start",
    backgroundColor: "#242424",
    alignSelf: "flex-start",
    padding: 15,
    borderRadius: 50,
    marginHorizontal: 10,
    marginVertical: 5
  },
});

export const formStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ebe9e9",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  logo: {
    width: 200,
    height: 200,
    marginTop: 50,
  },
  input: {
    borderWidth: 1.5,
    width: 300,
    marginVertical: 5,
    paddingVertical: 2,
    paddingHorizontal: 10,
    backgroundColor: "#ececec",
  },
  inputContainer: {
    marginVertical: 5,
    alignItems: "center",
  },
  btnsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  blackBtns: {
    backgroundColor: "#000000",
    padding: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 5,
  },
});
