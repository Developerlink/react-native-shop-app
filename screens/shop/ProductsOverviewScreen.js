import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/ProductItem";
import { addToCart } from "../../store/cartSlice";

export default function ProductsOverviewScreen({ navigation, route }) {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  return (
    <FlatList
      data={products}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetail={() =>
            navigation.navigate("productDetails", {
              productId: itemData.item.id,
            })
          }
          onAddToCart={() => dispatch(addToCart(itemData.item))}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff", justifyContent: "center" },
});
