import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function UserProductsScreen(navigation, route) {
  return (
    <View style={styles.screen}>
      <Text>user products screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({ screen: { flex: 1 } });
