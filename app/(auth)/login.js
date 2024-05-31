import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { Link, Redirect } from "expo-router";
import axios from "axios";

export default function Page() {
  const user = false;
  const [error, setError] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (user) {
    return (<Redirect href="/expenses" />);
  }

  async function httpRequest() {
    await axios
    .post(
      "http://192.168.31.239:8000/api/v1/sanctum/login",
      {
        email: email,
        password: password,
        device_name: "lap_eduardo",
      },
      {
        headers:{
          Accept: "application/vnd.api+json",
        },
      }
    )
    .then((response)=>{
      console.log(response.data);
    })
    .catch((error)=>{
      console.log(error.response.data);
      setError(error.response.data.errors.email)
    });
  }

  return (
    <View style={styles.container}>
      <View>
        <Image source={require("../../assets/user2.png")} style={styles.profile} />
      </View>

      <View style={styles.card}>
        <Text style={styles.Text}>
          Inicia Sesión
        </Text>
        <Text style={styles.Text2}>
          Ingresa tus datos:
        </Text>
        <View style={styles.textBox} >
          <TextInput 
          value={email}
          onChangeText={setEmail}
          placeholder="Correo electrónico" style={{ paddingHorizontal: 15 }} />
        </View>

        <View style={styles.textBox} >
          <TextInput 
          value={password}
          onChangeText={setPassword}
          placeholder="Contraseña" style={{ paddingHorizontal: 15 }} 
          secureTextEntry={true}/>
        </View>

        <View style={styles.btnConteiner}>
          <TouchableOpacity style={styles.btnBox} onPress={httpRequest}>
            <Text style={styles.btnText}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>

        

      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EDEC3F",
  },
  profile: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "white",
    margin: 15,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
    padding: 20,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textBox: {
    paddingVertical: 20,
    backgroundColor: "#cccccc40",
    borderRadius: 30,
    marginVertical: 10,
  },
  btnConteiner: {
    alignItems: "center",
  },
  btnBox: {
    backgroundColor: "#1C2A74",
    borderRadius: 30,
    paddingVertical: 20,
    width: 150,
    marginTop: 20,
  },
  btnText: {
    textAlign: "center",
    color: 'white',
    fontSize: 17
  },
  textLink:{
    color: "#6d6d6d",
    paddingTop: 30,
    textDecorationLine: "underline",
    fontSize: 16
  },
  Text:{
    fontSize: 37,
    textAlign: "center"
  },
  Text2:{
    fontSize: 20,
    textAlign: "center"
  }

});

