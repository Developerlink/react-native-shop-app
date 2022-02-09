import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import colors from "../constants/colors";

export default function ProductItem(props) {
  return (
    <TouchableOpacity onPress={props.onSelect}>
      <View style={styles.product}>
        <Image
          style={{ ...styles.image, ...props.style }}
          source={{ uri: props.image }}
        />
        <View style={styles.details}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.price}>$ {props.price.toFixed(2)}</Text>
        </View>
        <View style={styles.actions}>
          {props.children}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  product: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "white",
    height: 300,
    margin: 20,
  },
  image: {
    width: "100%",
    height: "60%",
  },
  details: {
    alignItems: "center",
    height: "15%",
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
    fontFamily: "open-sans-bold"
  },
  price: {
    fontSize: 14,
    color: "black",
    fontFamily: "open-sans"
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "25%",
    paddingHorizontal: 20,
  },
});
