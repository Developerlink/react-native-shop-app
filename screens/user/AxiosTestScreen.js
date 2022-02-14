import React, { useEffect } from "react";
import axios from "axios";
import { Text } from "react-native";
import agent from "../../api/agent";
import { useDispatch } from "react-redux";
import { createProductAsync, getProductsAsync } from "../../store/productSlice";

const url =
  "https://react-http-e1048-default-rtdb.europe-west1.firebasedatabase.app/comments.json";

const testUrl = "https://jsonplaceholder.typicode.com/users";

export default function ({ navigation }) {
  const dispatch = useDispatch();
  
  useEffect(async () => {
    //console.log("testing");

    try {
      //const res = dispatch(createProductAsync({id: "t1", name: "testaluta"}));
      //console.log(res.arg);
      //await axios.get(url).then(res => console.log(res.data));
      //const res = await agent.Products.postProduct({id: "t1", name: "testular", price: 0.99})
      //console.log(res);
      //dispatch(getProductsAsync());
      
    } catch (error) {
      //console.log(error);
    }
  }, []);

  return <Text>Axios testing</Text>;
}
