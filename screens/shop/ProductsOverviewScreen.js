import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/ProductItem";
import { addToCart } from "../../store/cartSlice";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/CustomHeaderButton";
import colors from "../../constants/colors";

export default function ProductsOverviewScreen({ navigation, route }) {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="menu"
            iconName="ios-menu"
            onPress={() => navigation.toggleDrawer()}
          />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Favorite"
            iconName={"ios-cart"}
            onPress={() => {
              navigation.navigate("/cart");
            }}
          />
        </HeaderButtons>
      ),
    });
  }, []);

  const onViewDetailHandler = (id) => {
    navigation.navigate("/productDetails", {
      productId: id,
    })
  }

  return (
    <FlatList
      data={products}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => onViewDetailHandler(itemData.item.id)}
        >
          <Button
            color={colors.primary}
            title="View Details"
            onPress={() => onViewDetailHandler(itemData.item.id)}
          />
          <Button
            color={colors.primary}
            title="Add To Cart"
            onPress={() => dispatch(addToCart(itemData.item))}
          />
        </ProductItem>
      )}
    />
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff", justifyContent: "center" },
});
