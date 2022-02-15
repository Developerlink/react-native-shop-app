import React, { useRef } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Button,
  Dimensions,
} from "react-native";
import colors from "../../constants/colors";
import Card from "../../components/Card";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {LinearGradient} from "expo-linear-gradient";

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(4).required(),
  price: yup
    .number("Price must be a number")
    .positive("Price must be a positive number")
    .required("Price is a required field"),
  description: yup.string().required("Description is a required field"),
});

export default function AuthScreen({ navigation, route }) {
  const {
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const priceInputRef = useRef();
  const descriptionInputRef = useRef();

  const onError = (errors) => {
    //console.log("inside on error");
    const error = Object.keys(errors)[0];

    if (error === "email") {
      emailInputRef.current.focus();
    } else if (error === "imageUrl") {
      passwordInputRef.current.focus();
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

  return (
    <KeyboardAvoidingView style={styles.screen}>
        <LinearGradient colors={["#eee", colors.primaryLight, "#eee"]} style={styles.gradient}>
      <Card>
        <ScrollView style={styles.form}>
          <View style={styles.form}>
            <View style={styles.formControl}>
              <Text style={styles.label}>Email</Text>
              <Controller
                control={control}
                name="email"
                rules={{ required: true }}
                defaultValue=""
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={(value) => onChange(value)}
                    onBlur={onBlur}
                    returnKeyType="next"
                    ref={emailInputRef}
                  />
                  )}
              />
              {errors["email"] && (
                  <Text style={styles.error}>{errors["email"].message}</Text>
                  )}
            </View>
            <View style={styles.formControl}>
              <Text style={styles.label}>Password</Text>
              <Controller
                control={control}
                name="password"
                rules={{ required: true }}
                defaultValue=""
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={(value) => onChange(value)}
                    onBlur={onBlur}
                    returnKeyType="done"
                    ref={passwordInputRef}
                    secureTextEntry={true}
                  />
                  )}
                  />
              {errors["password"] && (
                  <Text style={styles.error}>{errors["password"].message}</Text>
              )}
            </View>
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Button title="Login" color={colors.primaryLight} />
              </View>
              <View style={styles.button}>
                <Button title="Switch to Sign Up" color={colors.primary} />
              </View>
            </View>
          </View>
        </ScrollView>
      </Card>
                  </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
},
gradient: {
    width: "100%",
    height: "100%",
    paddingHorizontal: Dimensions.get("window").width < 500 ? 30 : 40,
    paddingVertical: Dimensions.get("window").width < 500 ? 20 : 40,
    justifyContent: "center",
  },
  form: {
    margin: 20,
    maxHeight: 400,
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
    fontSize: 20,
  },
  error: {
    color: "red",
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  button: {
    marginTop: 20,
    width: Dimensions.get("window").width < 500 ? "100%" : "40%",
  },
});
