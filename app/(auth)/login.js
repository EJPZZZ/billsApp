import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link, Redirect } from "expo-router";

export default function Page() {
  const user = false;

  if (user) {
    return (<Redirect href="/expenses" />);
  }

  return (
    <View style={styles.container}>
      <View>
        <Image source={require("../../assets/user2.png")} style={styles.profile} />
      </View>

      <View style={styles.card}>
        <Text></Text>
        <View style={styles.textBox} >
          <TextInput placeholder="Correo electrónico" style={{ paddingHorizontal: 15 }} />
        </View>

        <View style={styles.textBox} >
          <TextInput placeholder="Contraseña" style={{ paddingHorizontal: 15 }} />
        </View>

        <View style={styles.btnConteiner}>
          <TouchableOpacity style={styles.btnBox}>
            <Text style={styles.btnText}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>

        <View>
          <Link href="/registration" style={styles.textLink} >¿No tiene una cuenta? Cree una. </Link>
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
    backgroundColor: "#f5a905",
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
    shadowColor: "#000",
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
    backgroundColor: "#4f4f4f",
    borderRadius: 30,
    paddingVertical: 20,
    width: 150,
    marginTop: 20,
  },
  btnText: {
    textAlign: "center",
    color: 'white',
  },
  textLink:{
    color: "#6d6d6d",
    paddingTop: 30,
    textDecorationLine: "underline",
  }

});

