import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import BottomTabScreen from "../BottomTab/BottomTab";
import DrawerContent from "../../components/DrawerContent";

const DrawerStack = createDrawerNavigator();

const Drawer = () => {
  return (
    <DrawerStack.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <DrawerStack.Screen name="Home" component={BottomTabScreen} />
    </DrawerStack.Navigator>
  );
};

export default Drawer;
