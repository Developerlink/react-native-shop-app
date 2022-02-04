import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function EditProductScreen(navigation, route) {
  return (
    <View style={styles.screen}>
      <Text>Edit product screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({ screen: { flex: 1 } });
