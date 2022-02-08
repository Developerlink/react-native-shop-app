import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import colors from "../constants/colors";
import defaultHeaderOptions from "../constants/defaultHeaderOptions";
import OrdersScreen from "../screens/shop/OrdersScreen";

const Stack = createNativeStackNavigator();

export default function OrdersStackNavigator() {
  return (
    <View style={{ flex: 1 }} collapsable={false}>
      <Stack.Navigator
        initialRouteName="/orders"
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primaryLight,
          },
          ...defaultHeaderOptions,
        }}
      >
        <Stack.Screen
          name="/orders"
          component={OrdersScreen}
          options={{ title: "Orders" }}
        />
      </Stack.Navigator>
    </View>
  );
}
