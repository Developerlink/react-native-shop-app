import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { scale } from "../../utils/scaling";
import { addToCart } from "../../store/cartSlice";

const EMPTY_PRODUCT = {
  id: "",
  title: "",
  imageUrl: "test",
  price: 0,
  description: "",
};

export default function ProductDetailScreen({ navigation, route }) {
  const { products } = useSelector((state) => state.products);
  const [selectedProduct, setSelectedProduct] = useState(EMPTY_PRODUCT);
  const dispatch = useDispatch();

  useEffect(() => {
    const { productId } = route.params;
    const selectedProduct = products.find(
      (product) => product.id === productId
    );
    navigation.setOptions({ title: selectedProduct.title });
    setSelectedProduct(selectedProduct);
  }, []);

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <Button
          title="Add To Cart"
          onPress={() => dispatch(addToCart(selectedProduct))}
        />
      </View>
      <Text style={styles.price}>$ {selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: scale(300),
  },
  price: {
    fontSize: 20,
    color: "black",
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "open-sans-bold",
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 30,
    fontFamily: "open-sans",
  },
  actions: {
    marginVertical: 10,
    alignItems: "center",
  },
});
