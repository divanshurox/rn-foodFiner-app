import React, { useEffect, useState, useMemo, useReducer } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import AuthStack from "./navigation/AuthNavigator";

import * as Google from "expo-google-app-auth";

import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
  Provider,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from "react-native-paper";

import { AuthContext } from "./components/context";
import RootNavigator from "./navigation/RootNavigator";

export default function App() {
  const [isDarkTheme, toggleDarkTheme] = useState(false);

  const initState = {
    isAuth: false,
    name: "",
    avatarUrl: "",
    authToken: null,
  };

  const customDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
    },
  };
  const customDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: "#333333",
      text: "#ffffff",
    },
  };

  const theme = isDarkTheme ? customDarkTheme : customDefaultTheme;

  const loginReducer = (state, action) => {
    switch (action.type) {
      case "SIGN_IN":
        return {
          ...state,
          isAuth: true,
          name: action.name,
          avatarUrl: action.avatarUrl,
          authToken: action.token,
        };
      case "SIGN_OUT":
        return {
          ...state,
          isAuth: false,
          authToken: "",
          name: "",
          avatarUrl: "",
        };
      case "GET_TOKEN":
        return {
          ...state,
          authToken: action.token,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initState);

  const authContext = useMemo(
    () => ({
      signIn: async () => {
        try {
          const { type, accessToken, user } = await Google.logInAsync({
            androidClientId:
              "451977272236-i8b8rf0mv3c4k1m2qkst71fra813jut5.apps.googleusercontent.com",
          });

          if (type === "success") {
            await AsyncStorage.setItem("@token", accessToken);
            dispatch({
              type: "SIGN_IN",
              name: user.name,
              avatarUrl: user.photoUrl,
              token: accessToken,
            });
            console.log(loginState.name, loginState.avatarUrl);
          } else {
            console.log("cancelled auth");
          }
        } catch (e) {
          console.log(e);
        }
      },
      signOut: async () => {
        try {
          await Google.logOutAsync({
            accessToken: loginState.authToken,
            androidClientId:
              "451977272236-i8b8rf0mv3c4k1m2qkst71fra813jut5.apps.googleusercontent.com",
          });
          await AsyncStorage.removeItem("@token");
          dispatch({
            type: "SIGN_OUT",
          });
        } catch (e) {
          console.log(e);
        }
      },
      user: () => {
        return {
          name: loginState.name,
          avatarUrl: loginState.avatarUrl,
        };
      },
      toggleTheme: () => {
        toggleDarkTheme((isDarkTheme) => !isDarkTheme);
      },
    }),
    [loginState]
  );

  return (
    <Provider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
          {loginState.isAuth ? <RootNavigator /> : <AuthStack />}
        </NavigationContainer>
      </AuthContext.Provider>
    </Provider>
  );
}
