import React, {useState} from "react";
import { StatusBar } from "expo-status-bar";
import { enableScreens } from "react-native-screens";
import { Provider } from "react-redux";
import store from "./store/store";
import { NavigationContainer } from "@react-navigation/native";
import ShopStackNavigator from "./navigation/ShopStackNavigator";
import DrawerNavigator from "./navigation/DrawerNavigator";
import colors from "./constants/colors";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

enableScreens();

const fetchFontsAsync = async () => {
  await Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontIsLoaded, setFontIsLoaded] = useState(false);

  if (!fontIsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFontsAsync}
        onFinish={() => setFontIsLoaded(true)}
        onError={(error) => console.log(error)}
      />
    );
  }

  return (
    <Provider store={store}>
      <StatusBar
        backgroundColor={colors.primaryDark}
        style="light"
      />
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </Provider>
  );
}
