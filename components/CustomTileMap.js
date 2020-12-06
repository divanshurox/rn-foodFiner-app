import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const CustomTileMap = () => {
  return (
    <View>
      <View style={styles.bubble}>
        <Text style={styles.name}>Favourite Restaurant</Text>
        <Text>A short Descriptions</Text>
      </View>
      <View style={styles.arrowBorder} />
      <View style={styles.arrow} />
    </View>
  );
};

export default CustomTileMap;

const styles = StyleSheet.create({
  bubble: {
    flexDirection: "column",
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 6,
    borderColor: "#ccc",
    borderWidth: 0.5,
    padding: 15,
    width: "50%",
  },
  arrow: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#fff",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#007a87",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -0.5,
  },
  name: {
    fontSize: 16,
    marginBottom: 5,
  },
});
