import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import DetailsScreen from "../../screens/DetailsScreen";

import { Feather } from "@expo/vector-icons";

const Stack = createStackNavigator();

const DetailStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#009387",
        },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          headerLeft: () => (
            <Feather
              name="menu"
              size={24}
              backgroundColor="#009387"
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default DetailStack;
