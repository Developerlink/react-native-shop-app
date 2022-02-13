import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import { Platform, View } from "react-native";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <View style={{ flex: 1 }} collapsable={false}>
      <Stack.Navigator
        initialRouteName="/overview"
        screenOptions={{
          headerStyle: {
            backgroundColor: Platform.OS === "android" ? "black" : "black",
          },
          headerTintColor: Platform.OS === "android" ? "white" : "white",
          headerTitleAlign: "center",
          headerTitleStyle: "open-sans-bold",
        }}
      >
        <Stack.Screen
          name="/overview"
          component={ProductsOverviewScreen}
          options={{ title: "Products" }}
        />
        <Stack.Screen
          name="/details"
          component={ProductDetailScreen}
          options={{ title: "Product Details" }}
        />
      </Stack.Navigator>
    </View>
  );
}
