import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";


export default function home() {

  return (
    <Redirect href="/expenses" />

  );



  //if (!user == null) {

  //return <Redirect href="/login" />;
  //}

  // return <Redirect href="/home" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e3b81c",
    justifyContent: "center",
    alignItems: "center",

  },
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

  },
  text: {
    color: "#3d220b",
    fontSize: 20,
    marginTop: 10,

  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});


