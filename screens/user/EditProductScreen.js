import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import colors from "../../constants/colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/CustomHeaderButton";
import { createProduct, updateProduct } from "../../store/productSlice";

const EMPTY_PRODUCT = {
  id: "",
  title: "",
  imageUrl: "",
  price: "",
  description: "",
  ownerId: "u1"
};

export default function EditProductScreen({ navigation, route }) {
  const { products } = useSelector((state) => state.products);
  const [selectedProduct, setSelectedProduct] = useState(EMPTY_PRODUCT);
  const dispatch = useDispatch();

  useEffect(() => {
    if (route.params) {
      const { productId } = route.params;
      const selectedProduct = products.find(
        (product) => product.id === productId
      );
      navigation.setOptions({ title: "Edit " + selectedProduct.title });
      setSelectedProduct(selectedProduct);
    } else {
      navigation.setOptions({ title: "Add new product" });
    }
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="save"
            iconName="ios-checkmark"
            onPress={
              selectedProduct.id === ""
                ? () => {
                  const product = {
                    ...selectedProduct,
                    price: parseFloat(selectedProduct.price),
                  }
                    dispatch(createProduct(product));
                  }
                : () => {
                  const product = {
                    ...selectedProduct,
                    price: parseFloat(selectedProduct.price),
                  }
                    dispatch(updateProduct(product));
                  }
            }
          />
        </HeaderButtons>
      ),
    });
  }, [selectedProduct]);

  const onInputChangedHandler = (event) => {
    //console.log(event.value);
    //console.log(event.name);
    const { name, value } = event;
    setSelectedProduct((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={selectedProduct.title}
            onChangeText={(value) =>
              onInputChangedHandler({ name: "title", value })
            }
          ></TextInput>
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={selectedProduct.imageUrl}
            onChangeText={(value) =>
              onInputChangedHandler({ name: "imageUrl", value })
            }
          ></TextInput>
        </View>
        {selectedProduct.id !== "" ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={selectedProduct.price.toString()}
              onChangeText={(value) =>
                onInputChangedHandler({ name: "price", value })
              }
              keyboardType="decimal-pad"
            ></TextInput>
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={selectedProduct.description}
            onChangeText={(value) =>
              onInputChangedHandler({ name: "description", value })
            }
          ></TextInput>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});
