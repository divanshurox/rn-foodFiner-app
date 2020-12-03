import React, { useContext } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";

import { AuthContext } from "../components/context";

const LoggedInScreen = ({ name, avatarUrl }) => {
  const { signOut } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text>{name}, you are now logged in!</Text>
      <Image source={{ uri: avatarUrl }} style={styles.image} />
      <Button title="Logout" onPress={() => signOut()} />
    </View>
  );
};

export default LoggedInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    borderRadius: 100,
    height: 200,
    width: 200,
    marginTop: 50,
  },
});
