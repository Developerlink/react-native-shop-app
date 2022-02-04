import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function CartScreen(navigation, route) {
  return (
    <View style={styles.screen}>
      <Text>Cart screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({ screen: { flex: 1 } });
