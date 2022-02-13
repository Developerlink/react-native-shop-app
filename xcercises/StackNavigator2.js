import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";

const Stack = createNativeStackNavigator();

export default function StackNavigator2() {
  return (
    <View style={{ flex: 1 }} collapsable={false}>
      <Stack.Navigator
        initialRouteName="/route1"
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
          name="/route1"
          component={ProductDetailScreen}
          options={{ title: "Details" }}
        />
        <Stack.Screen
          name="/route2"
          component={ProductsOverviewScreen}
          options={{ title: "Overview" }}
        />
      </Stack.Navigator>
    </View>
  );
}
