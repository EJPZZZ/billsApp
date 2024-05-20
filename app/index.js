import React from "react";
import { Redirect, router } from "expo-router";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";

export default function home() {
  const user = null;

  
  async function httpRequest() {
    await axios.get('http://192.168.31.248/api/v1/user',{
      headers:{
        Authorization: 'Bearer 5|q7owgGOVXnxz4EU4gxwYmhUnCPNEyLtxyN9Gf1qyafafa5cf'
      }
    }).then
    ((response)=>{
      console.log(response.data)
    }).catch((error)=>{
      console.log(error)
    })
  }

  httpRequest()

return(
  <View style={styles.container}>
    <ActivityIndicator color="#784aed" size="large" />
    <Text style={styles.text}>Cargando datos...
    Espere un momento.</Text>
  </View>
);

  //if (!user == null) {
    
    //return <Redirect href="/login" />;
  //}

 // return <Redirect href="/home" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000017',
    alignItems: "center",
    justifyContent: "center"
  },
  text:{
    color: "#ffffff",
    fontSize: 20,
    marginTop: 10,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
