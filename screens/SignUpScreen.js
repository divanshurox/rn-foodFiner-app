import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, FontAwesome, Feather } from "@expo/vector-icons";

import { AuthContext } from "../components/context";

import * as Animatable from "react-native-animatable";

const SignUpScreen = () => {
  const [isPasswordHidden, setPasswordHidden] = useState(true);
  const { signIn } = useContext(AuthContext);

  const [useData, setUserData] = useState({
    email: "",
    password: "",
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="orange" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Header</Text>
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
          <Feather name="user" size={20} color="#05375a" />
          <TextInput
            placeholder="Enter your email"
            onChangeText={(text) =>
              setUserData((data) => {
                return {
                  ...data,
                  email: text,
                };
              })
            }
            style={styles.textInput}
            autoCapitalize="none"
          />
          <Feather name="check-circle" color="green" size={20} />
        </View>
        <Text
          style={[
            styles.text_footer,
            {
              marginTop: 35,
            },
          ]}
        >
          Email
        </Text>
        <View style={styles.action}>
          <Feather name="lock" size={20} color="#05375a" />
          <TextInput
            placeholder="Enter your password"
            onChangeText={(text) =>
              setUserData((data) => {
                return {
                  ...data,
                  password: text,
                };
              })
            }
            style={styles.textInput}
            autoCapitalize="none"
            secureTextEntry={isPasswordHidden}
          />
          <TouchableWithoutFeedback
            onPress={() => setPasswordHidden((val) => !val)}
          >
            <Feather
              name={isPasswordHidden ? "eye-off" : "eye"}
              color="grey"
              size={20}
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.button}>
          <LinearGradient colors={["#f2c746", "orange"]} style={styles.signIn}>
            <Text style={styles.textSign}>Get Started</Text>
          </LinearGradient>
        </View>
        <TouchableOpacity onPress={signIn}>
          <View style={styles.button}>
            <LinearGradient
              colors={["#3f6db8", "#d14034", "#dea90b", "#33974e"]}
              style={styles.signIn}
              end={[0.8, 0.9]}
            >
              <Text style={styles.textSign}>Sign In with Google</Text>
            </LinearGradient>
          </View>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 20,
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
