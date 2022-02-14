import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import colors from "../constants/colors";
import defaultHeaderOptions from "../constants/defaultHeaderOptions";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import { Platform } from "react-native";
import AxiosTestScreen from "../screens/user/AxiosTestScreen";

const Stack = createNativeStackNavigator();

export default function UserStackNavigator({ navigation, route }) {  

  return (
    <Stack.Navigator
      initialRouteName="/userProducts"
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? colors.primaryDark : "white",
        },
        headerTintColor: Platform.OS === "android" ? "white" : colors.primaryDark,
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
      <Stack.Screen 
      name="/axios"
      component={AxiosTestScreen}
      options={{title: "Axios testing"}}
      />
    </Stack.Navigator>
  );
}
