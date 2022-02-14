import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/ProductItem";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/CustomHeaderButton";
import colors from "../../constants/colors";
import { deleteProduct, deleteProductAsync } from "../../store/productSlice";
import { deleteProductFromCart } from "../../store/cartSlice";

export default function UserProductsScreen({ navigation, route }) {
  const { userProducts, status, errorStatus } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();

  useEffect(async () => {
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
            title="menu"
            iconName="ios-add"
            onPress={() => navigation.navigate("/editProduct")}
          />
        </HeaderButtons>
      ),
    });
  }, []);

  const onEditHandler = (id) => {
    navigation.navigate("/editProduct", { productId: id });
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
      </View>
    );
  }

  if (status === "idle" && userProducts.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={userProducts}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => onEditHandler(itemData.item.id)}
        >
          <Button
            color={colors.primary}
            title="Edit"
            onPress={() => onEditHandler(itemData.item.id)}
          />
          <Button
            color={colors.primary}
            title="Delete"
            onPress={() => {
              Alert.alert("Are you sure?", "Do want to delete this item?", [
                { text: "No", style: "default" },
                {
                  text: "Yes",
                  style: "destructive",
                  onPress: () => {
                    dispatch(deleteProductAsync(itemData.item.id));
                    dispatch(deleteProductFromCart({ id: itemData.item.id }));
                  },
                },
              ]);
            }}
          />
        </ProductItem>
      )}
    />
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});
