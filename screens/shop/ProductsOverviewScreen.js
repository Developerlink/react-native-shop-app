import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ProductsOverviewScreen(navigation, route) {
  return (
    <View style={styles.screen}>
      <Text>Products overview screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({ screen: { flex: 1 } });
