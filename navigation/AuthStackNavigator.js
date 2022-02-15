import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import colors from "../constants/colors";
import AuthScreen from "../screens/user/AuthScreen";
import defaultHeaderOptions from "../constants/defaultHeaderOptions";
import { Platform } from "react-native";

const Stack = createNativeStackNavigator();

export default function AuthStackNavigator({ navigation, rout }) {
  return (
    <Stack.Navigator
        initialRouteName="/login"
        screenOptions={{
            headerStyle: {
                backgroundColor: Platform.OS === "android" ? "#eff" : "#eff"
            },
            headerTintColor: Platform.OS === "andorid" ? colors.primaryLight : colors.primaryLight,
            ...defaultHeaderOptions
        }}    >
      <Stack.Screen
        name="/login"
        component={AuthScreen}
        options={{ title: "Login" }}
      />
    </Stack.Navigator>
  );
}
