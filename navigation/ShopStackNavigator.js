import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Platform } from "react-native";
import colors from "../constants/colors";
import defaultHeaderOptions from "../constants/defaultHeaderOptions";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";

const Stack = createNativeStackNavigator();

export default function ShopStackNavigator() {
  return (
    <View style={{ flex: 1 }} collapsable={false}>
      <Stack.Navigator
        initialRouteName="/products"
        screenOptions={{
          headerStyle: {
            backgroundColor: Platform.OS === "android" ? colors.primary : "white",
          },
          headerTintColor: Platform.OS === "android" ? "#fff" : colors.primary,
          ...defaultHeaderOptions,
        }}
      >
        <Stack.Screen
          name="/products"
          component={ProductsOverviewScreen}
          options={{ title: "Products" }}
        />
        <Stack.Screen
          name="/productDetails"
          component={ProductDetailScreen}
          options={{ title: "Product Details" }}
        />
        <Stack.Screen
          name="/cart"
          component={CartScreen}
          options={{ title: "Cart" }}
        />
      </Stack.Navigator>
    </View>
  );
}
