import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Tabs() {
  return (
    <View style={styles.container}>
      <View style={styles.shadow}>
        <View style={styles.tabs}>

          <Link href="/incomes" style={styles.tab_link}>
            <View style={styles.tabItem}>
              <MaterialCommunityIcons name="account-cash" size={30} color="white" />
              <Text style={styles.tabText}>Ingresos</Text>
            </View>
          </Link>
          
          <Link href="/home" style={styles.tab_link}>
            <View>
            <AntDesign name="close" size={35} color="white" />
            <Text style={styles.tabText}></Text>
            </View>
          </Link>
          
          <Link href="/expenses" style={styles.tab_link}>
            <View style={styles.tabItem}>
            <MaterialCommunityIcons name="cash-remove" size={35} color="white" />
            <Text style={styles.tabText}>Gastos</Text>
            </View>
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
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  tabs: {
    flexDirection: "row",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    justifyContent: "space-around",
    backgroundColor: "#0F9B1D",
  },
  tab_link: {
    color: "#ffffff",
    fontWeight: "500",
    fontSize: 14,
    padding: 20,
  },
  tabItem: {
    alignItems: 'center',
  },
  tabText: {
    marginTop: 0,
    fontSize: 18,
    color: "white",
    
  },
});
