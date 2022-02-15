import React, { useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ShopStackNavigator from "./ShopStackNavigator";
import OrdersStackNavigator from "./OrdersStackNavigator";
import UserStackNavigator from "./UserStackNavigator";
import { useDispatch, useSelector } from "react-redux";
import AuthStackNavigator from "./AuthStackNavigator";

import colors from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { isLoggedIn, status } = useSelector((state) => state.auth);
  console.log(isLoggedIn);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: {
          fontSize: 16,
          fontFamily: "open-sans-bold",
        },
        drawerActiveTintColor: colors.primaryLight,
      }}
    >
      {isLoggedIn ? (
        <>
          <Drawer.Screen
            name="/productDrawer"
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
            name="/ordersDrawer"
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
          <Drawer.Screen
            name="/userProductsDrawer"
            component={UserStackNavigator}
            options={{
              title: "Your Products",
              drawerIcon: ({ focused }) => (
                <Ionicons
                  name="ios-create"
                  size={23}
                  color={focused ? colors.primaryLight : colors.inactive}
                />
              ),
            }}
          />
        </>
      ) : (
        <>
          <Drawer.Screen
            name="/authDrawer"
            component={AuthStackNavigator}
            options={{
              title: "Login",
              drawerIcon: ({ focused }) => (
                <Ionicons
                  name="ios-person"
                  size={23}
                  color={focused ? colors.primaryLight : colors.inactive}
                />
              ),
            }}
          />
        </>
      )}
    </Drawer.Navigator>
  );
}
