import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import colors from "../../constants/colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/CustomHeaderButton";
import { createProduct, updateProduct } from "../../store/productSlice";
import { useForm, Controller } from "react-hook-form";
import { onChange } from "react-native-reanimated";

export default function EditProductScreen({ navigation, route }) {
  const { products } = useSelector((state) => state.products);
  const [selectedProduct, setSelectedProduct] = useState({
    id: "",
    ownerId: "u1",
  });
  const dispatch = useDispatch();
  const {
    setFocus,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const titleInputRef = useRef();
  const imageUrlInputRef = useRef();
  const priceInputRef = useRef();
  const descriptionInputRef = useRef();

  const onSubmit = (data) => {
    // console.log(data);
    const product = {
      ...selectedProduct,
      title: data.title,
      imageUrl: data.imageUrl,
      price: +data.price,
      description: data.description,
    };

    //console.log(product);

    if (selectedProduct.id === "") {
      // console.log("new product");
      dispatch(createProduct(product));
    } else {
      // console.log("update product");
      dispatch(updateProduct(product));
    }

    navigation.goBack();
  };

  // const error = Object.keys(errors)[0];

  // if (error === "title") {
  //   titleInputRef.current.focus();
  // } else if (error === "imageUrl") {
  //   imageUrlInputRef.current.focus();
  // } else if (error === "price") {
  //   priceInputRef.current.focus();
  // } else if (error === "description") {
  //   descriptionInputRef.current.focus();
  // } else if (error) {
  //   console.log(errors);
  // } else {
  //   console.log("There are no errors!");
  // }

  const onError = () => {
    console.log("submithandler");
  };

  //console.log(errors);

  // Loading first time.
  useEffect(() => {
    if (route.params) {
      const { productId } = route.params;
      const selectedProduct = products.find(
        (product) => product.id === productId
      );

      setSelectedProduct(selectedProduct);
      setValue("title", selectedProduct.title);
      setValue("imageUrl", selectedProduct.imageUrl);
      setValue("price", selectedProduct.price);
      setValue("description", selectedProduct.description);

      navigation.setOptions({ title: "Edit " + selectedProduct.title });
    } else {
      navigation.setOptions({ title: "Add new product" });
    }
  }, []);

  // Right Header button.
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item title="save" iconName="ios-checkmark" onPress={errors ? handleSubmit(onError) : handleSubmit(onSubmit)} />
        </HeaderButtons>
      ),
    });
  }, [handleSubmit, onSubmit, errors, onError]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <Controller
            control={control}
            name="title"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                value={value}
                onChangeText={(value) => onChange(value)}
                onBlur={onBlur}
                returnKeyType="next"
                ref={titleInputRef}
              />
            )}
          />
          {errors["title"] && (
            <Text style={styles.error}>Title is required</Text>
          )}
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <Controller
            control={control}
            name="imageUrl"
            rules={{ required: true }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                style={styles.input}
                value={value}
                onChangeText={(value) => onChange(value)}
                onBlur={onBlur}
                returnKeyType="next"
                ref={imageUrlInputRef}
              />
            )}
          />
          {errors["imageUrl"] && (
            <Text style={styles.error}>Image URL is required</Text>
          )}
        </View>
        {selectedProduct.id !== "" ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <Controller
              control={control}
              name="price"
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  style={styles.input}
                  value={value}
                  onChangeText={(value) => onChange(value)}
                  onBlur={onBlur}
                  returnKeyType="next"
                  keyboardType="decimal-pad"
                  ref={priceInputRef}
                />
              )}
            />
            {errors["price"] && (
              <Text style={styles.error}>Price is required</Text>
            )}
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <Controller
            control={control}
            name="description"
            rules={{ required: true }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                style={styles.input}
                value={value}
                onChangeText={(value) => onChange(value)}
                onBlur={onBlur}
                ref={descriptionInputRef}
              />
            )}
          />
          {errors["description"] && (
            <Text style={styles.error}>Description is required</Text>
          )}
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
  error: {
    color: "red",
  },
});
