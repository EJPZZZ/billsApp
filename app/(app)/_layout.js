import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Slot } from 'expo-router';
import Tabs from '../../components/tabs';
import Header from '../../components/header';


const Layout = () => {
  return (
    <>
      <View style={styles.container}>
        <Header style={styles.header} />
        <View style={styles.main}>
          <Slot />
        </View>
        <Tabs style={styles.tabs} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDEC3F",
    alignItems: "center",
    justifyContent: "space-between",
  },
  main: {
    height: "100%",
    position: "absolute",
  },
});


export default Layout;
