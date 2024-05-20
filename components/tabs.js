import { StyleSheet, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { FontAwesome } from '@expo/vector-icons';


export default function Tabs() {
  return (
    <View style={styles.container}>
      <View style={styles.shadow}>
        <View style={styles.tabs}>
          <Link href="/incomes" style={styles.tab_link}>
            <FontAwesome name="dollar" size={24} color="white" />
            Ingresos
          </Link>
          <Link href="/auth/login" style={styles.tab_link}>
            <FontAwesome name="home" size={24} color="white" />
            Home
          </Link>
          <Link href="/bills" style={styles.tab_link}>
            <FontAwesome name="shopping-cart" size={24} color="white" />
            Gastos
          </Link>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  shadow: {
    // borderRadius: 30,
    // shadowOffset: { width: 40, height: 40 },
    // shadowColor: "#784aed",
    // shadowOpacity: 1,
    // elevation: 5,
    // backgroundColor: "#0000",
    // padding: 1,
  },
  tabs: {
    flexDirection: "row",
    borderRadius: 30,
    justifyContent: "space-around",
    backgroundColor: "#1C2A74",
  },
  tab_link: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 20,
    padding: 20,
  },
});
