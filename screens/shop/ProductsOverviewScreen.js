import React, { useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/ProductItem";
import { addToCart } from "../../store/cartSlice";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/CustomHeaderButton";
import colors from "../../constants/colors";
import { getProductsAsync } from "../../store/productSlice";

export default function ProductsOverviewScreen({ navigation, route }) {
  const { products, status, errorStatus } = useSelector(
    (state) => state.products
  );
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

  useFocusEffect(
    useCallback(() => {
      dispatch(getProductsAsync());

      return () => {};
    }, [])
  );

  const onViewDetailHandler = (id) => {
    navigation.navigate("/productDetails", {
      productId: id,
    });
  };

  if (status !== "idle") {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (errorStatus !== "") {
    return (
      <View style={styles.centered}>
        <Text style={styles.message}>{errorStatus}</Text>
        <Button
          color={colors.primary}
          title="Try Again"
          onPress={() => dispatch(getProductsAsync())}
        />
      </View>
    );
  }

  if (status === "idle" && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found.</Text>
      </View>
    );
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
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  message: { marginBottom: 10 },
});
