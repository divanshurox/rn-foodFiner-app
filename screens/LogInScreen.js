import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";

import { AuthContext } from "../components/context";

const LogInScreen = () => {
  const { signIn } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Button title="Authenticate" onPress={() => signIn()} />
      <StatusBar style="auto" />
    </View>
  );
};

export default LogInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
