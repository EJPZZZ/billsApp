import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';



const incomes = () => {

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.main}>

        <View style={styles.item}>
          <Image source={require('../../assets/iconIncomes.png')} style={styles.itemImage} />
          <View style={styles.itemTextContainer}>
            <Text style={styles.itemTitle}>Title</Text>
            <Text style={styles.itemDescription}>Item description</Text>
            <Text style={styles.itemDescription}>17-05-2024</Text>
          </View>

          <View style={styles.icons}>
            <TouchableOpacity style={{marginBottom: 10,}}>
              <FontAwesome5 name="edit" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <AntDesign name="closecircle" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    marginTop: 75,
  },
  main: {
    flex: 1,
    maxWidth: 960,
    marginBottom: 50,
  },

  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
  item: {
    backgroundColor: '#fefefe',
    padding: 20,
    width: 310,
    borderRadius: 15,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemTextContainer: {
    flex: 1,
    justifyContent: "space-evenly",

  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  icons: {
    marginHorizontal: 20,

  },
});

export default incomes;