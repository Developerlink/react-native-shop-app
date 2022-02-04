import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function OrdersScreen(navigation, route) {
  return (
    <View style={styles.screen}>
      <Text>Orders screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({ screen: { flex: 1 } });
