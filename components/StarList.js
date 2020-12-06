import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

const StarList = ({ number, review }) => {
  let stars = [];
  for (let i = 0; i < 5; i++) {
    let name = "ios-star";
    if (number < i) {
      name = "ios-star-outline";
    }
    stars.push(<Ionicons name={name} size={20} color="#FF8C00" key={i} />);
  }
  return (
    <View style={styles.container}>
      {stars}
      <Text style={styles.review}>({review})</Text>
    </View>
  );
};

export default StarList;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  review: {
    marginLeft: 10,
  },
});
