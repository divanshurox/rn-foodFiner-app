import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { useTheme } from "@react-navigation/native";

const HomeScreen = () => {
  const { colors, dark } = useTheme();
  return (
    <View style={styles.container}>
      <Text style={{ color: colors.text }}>Home Screen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
