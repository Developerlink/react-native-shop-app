import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import colors from "../constants/colors";
import defaultHeaderOptions from "../constants/defaultHeaderOptions";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";

const Stack = createNativeStackNavigator();

export default function UserStackNavigator({ navigation, route }) {
  return (
    <Stack.Navigator
      initialRouteName="/userProducts"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primaryDark,
        },
        ...defaultHeaderOptions,
      }}
    >
      <Stack.Screen
        name="/userProducts"
        component={UserProductsScreen}
        options={{ title: "Your Products" }}
      />
      <Stack.Screen
        name="/editProduct"
        component={EditProductScreen}
        options={{ title: "Edit product" }}
      />
    </Stack.Navigator>
  );
}
