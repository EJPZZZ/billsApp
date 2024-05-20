import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert, TextInput, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const incomes = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [incomeDescription, setIncomeDescription] = useState('');
  const [incomeAmount, setIncomeAmount] = useState('');


  const handleIncomeSubmit = () => {
    // Validación de campos vacios
    if (!incomeDescription || !incomeAmount) {
      Alert.alert('Error', 'Por favor complete todos los campos');
      return;
    }
    console.log('Descripción de ingreso:', incomeDescription);
    console.log('Cantidad de ingreso:', incomeAmount);

    // Limpia el formulario y cierra el modal
    setIncomeDescription('');
    setIncomeAmount('');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>

      <View style={styles.main}>
      <Text style={styles.title}> Aqui podras ver tus ingresos </Text>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Registrar Ingreso</Text>
            <TextInput
              style={styles.input}
              placeholder="Descripción"
              value={incomeDescription}
              onChangeText={text => setIncomeDescription(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Cantidad"
              keyboardType="numeric"
              value={incomeAmount}
              onChangeText={text => setIncomeAmount(text)}
            />
            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={handleIncomeSubmit}>
                <Text style={styles.textStyle}>Guardar</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

        <TouchableOpacity style={styles.fabLocation} 
        onPress={() => setModalVisible(true)}>
          <View style={styles.fab}>
            <AntDesign name="plus" style={styles.fabIcon} />
          </View>
        </TouchableOpacity>


      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
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
  fabLocation:{
    position: "absolute",
    bottom: 58,
    right: 110,
  },
  fab: {
    backgroundColor: "#0bb188",
    width: 60,
    height: 60,
    borderRadius: 100,
    justifyContent: "center",
    alignContent: "center",
  },
  fabIcon: {
    color: "white",
    position: 'relative',
    padding: 19,
    fontSize: 22,

  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 15,
    padding: 10,
    elevation: 2,
    marginHorizontal: 5,
  },
  buttonClose: {
    backgroundColor: '#0bb188',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default incomes;