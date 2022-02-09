import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import colors from "../../constants/colors";
import CartItem from "../../components/CartItem";
import { removeFromCart, resetCart } from "../../store/cartSlice";
import { addOrder } from "../../store/orderSlice";

export default function CartScreen({ navigation, route }) {
  const { totalAmount, items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>$ {totalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          color={colors.secondary}
          title="Order Now"
          disabled={items.length === 0}
          onPress={() => {
            dispatch(addOrder({items, totalAmount}));
            dispatch(resetCart());
            navigation.navigate("/ordersDrawer");
          }}
        />
      </View>
      <FlatList
        data={items}
        renderItem={(itemData) => (
          <CartItem
            price={itemData.item.price}
            title={itemData.item.title}
            quantity={itemData.item.quantity}
            sum={itemData.item.sum}
            onRemove={() => dispatch(removeFromCart(itemData.item))}
            isDeletable
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, margin: 20 },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "white",
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: colors.secondary,
  },
});
