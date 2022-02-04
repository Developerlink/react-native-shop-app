import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ProductDetailScreen(navigation, route) {
  return (
    <View style={styles.screen}>
      <Text>Product details screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({ screen: { flex: 1 } });
