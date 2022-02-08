import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ShopStackNavigator from "./ShopStackNavigator";
import colors from "../constants/colors";
import OrdersStackNavigator from "./OrdersStackNavigator";
import { Ionicons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="/productOverview"
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: {
          fontSize: 16,
          fontFamily: "open-sans-bold",
        },
        drawerActiveTintColor: colors.primaryLight,
      }}
    >
      <Drawer.Screen
        name="/productOverview"
        component={ShopStackNavigator}
        options={{
          title: "Products",
          drawerIcon: ({ focused }) => (
            <Ionicons
              name="ios-cart"
              size={23}
              color={focused ? colors.primaryLight : colors.inactive}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="/ordersOverview"
        component={OrdersStackNavigator}
        options={{
          title: "Orders",
          drawerIcon: ({ focused }) => (
            <Ionicons
              name="ios-list"
              size={23}
              color={focused ? colors.primaryLight : colors.inactive}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
