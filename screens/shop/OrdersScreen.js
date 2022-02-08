import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/CustomHeaderButton";
import { useSelector, useDispatch } from "react-redux";
import OrderItem from "../../components/OrderItem";

export default function OrdersScreen({ navigation, route }) {
  const { orders } = useSelector((state) => state.orders);

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
  }, []);

  return (
    <FlatList
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

const styles = StyleSheet.create({ screen: { flex: 1 } });
