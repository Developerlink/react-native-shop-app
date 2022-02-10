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
import Card from "./Card";

export default function ProductItem(props) {
  return (
    <TouchableOpacity onPress={props.onSelect}>
      <Card style={styles.product}>
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
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  product: {    
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
