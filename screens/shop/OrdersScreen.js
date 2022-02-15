import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/CustomHeaderButton";
import { useSelector, useDispatch } from "react-redux";
import OrderItem from "../../components/OrderItem";
import colors from "../../constants/colors";
import { getOrdersAsync } from "../../store/orderSlice";

export default function OrdersScreen({ navigation, route }) {
  const { orders, status } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadOrders = useCallback(() => {
    setIsRefreshing(true);
    const ownerId = "u1";
    dispatch(getOrdersAsync(ownerId));
    setIsRefreshing(false);
  }, [dispatch, setIsRefreshing]);

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
    });

    loadOrders();
  }, [loadOrders]);

  if (status !== "idle") {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (status === "idle" && orders.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No orders were found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      refreshing={isRefreshing}
      onRefresh={loadOrders}
      data={orders}
      renderItem={(itemData) => (
        <OrderItem
          totalAmount={itemData.item.totalAmount}
          date={itemData.item.date}
          items={itemData.item.items}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});
