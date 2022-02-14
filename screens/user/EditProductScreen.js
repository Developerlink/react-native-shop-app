import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import colors from "../../constants/colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/CustomHeaderButton";
import { createProduct, updateProduct } from "../../store/productSlice";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  postProductAsync,
  getProductsAsync,
  putProductAsync,
} from "../../store/productSlice";

const schema = yup.object({
  title: yup.string().required("Title is a required field"),
  imageUrl: yup.string().required("Image URL is a required field"),
  price: yup
    .number("Price must be a number")
    .positive("Price must be a positive number")
    .required("Price is a required field"),
  description: yup.string().required("Description is a required field"),
});

export default function EditProductScreen({ navigation, route }) {
  const { products, status, errorStatus } = useSelector(
    (state) => state.products
  );
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
  } = useForm({
    resolver: yupResolver(schema),
  });
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
    delete product.id;

    //console.log(product);
    if (selectedProduct.id === "") {
      // console.log("new product");
      dispatch(postProductAsync(product));
    } else {
      // console.log("update product");
      dispatch(putProductAsync({ key: selectedProduct.id, product: product }));
    }
    //navigation.goBack();
  };

  const onError = (errors) => {
    //console.log("inside on error");
    const error = Object.keys(errors)[0];

    if (error === "title") {
      titleInputRef.current.focus();
    } else if (error === "imageUrl") {
      imageUrlInputRef.current.focus();
    } else if (error === "price") {
      priceInputRef.current.focus();
    } else if (error === "description") {
      descriptionInputRef.current.focus();
    } else if (error) {
      console.log(errors);
    } else {
      console.log("There are no errors!");
    }
  };

  useEffect(() => {
    if (errorStatus !== "") {
      Alert.alert("An error occured!", errorStatus, [{ text: "Okay" }]);
    } else {
      navigation.goBack();
    }
  }, [errorStatus]);

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
          <Item
            title="save"
            iconName="ios-checkmark"
            onPress={handleSubmit(onSubmit, onError)}
          />
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
            defaultValue=""
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
            <Text style={styles.error}>{errors["title"].message}</Text>
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
            <Text style={styles.error}>{errors["imageUrl"].message}</Text>
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
              <Text style={styles.error}>
                Price is a required field and must be a positive number{" "}
              </Text>
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
            <Text style={styles.error}>{errors["description"].message}</Text>
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
