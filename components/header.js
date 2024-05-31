import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Pressable } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Header() {
  const [modalVisible, setModalVisible] = useState(false);
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [incomeDescription, setIncomeDescription] = useState('');
  const [incomeAmount, setIncomeAmount] = useState('');
  const [incomeDate, setIncomeDate] = useState('');
  const [expenseDescription, setExpenseDescription] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDate, setExpenseDate] = useState('');

  const userId = 1; 

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; 
    setIncomeDate(today);
    setExpenseDate(today);
  }, []);

  const sendDataToAPI = async (description, amount, date, type) => {
    try {
      const apiUrl = `https://api.tectest.click/api/${type === 'income' ? 'incomes' : 'expenses'}`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: description,
          amount: parseFloat(amount),
          date: date,
          user_id: userId,
        }),
      });
      if (response.ok) {
        console.log(`Datos de ${type === 'income' ? 'ingreso' : 'gasto'} enviados con éxito a la API.`);
        
      } else {
        console.error('Error al enviar datos a la API:', response.statusText);
      }
    } catch (error) {
      console.error('Error al enviar datos a la API:', error);
    }
  };
  

  const handleIncomeSubmit = () => {
    console.log('Ingreso:', incomeDescription, incomeAmount, incomeDate);
    sendDataToAPI(incomeDescription, incomeAmount, incomeDate, 'income');
    setIncomeDescription('');
    setIncomeAmount('');
    setIncomeDate(new Date().toISOString().split('T')[0]); 
    setModalVisible(false);
  };

  const handleExpenseSubmit = () => {
    console.log('Gasto:', expenseDescription, expenseAmount, expenseDate);
    sendDataToAPI(expenseDescription, expenseAmount, expenseDate, 'expense');
    setExpenseDescription('');
    setExpenseAmount('');
    setExpenseDate(new Date().toISOString().split('T')[0]); 
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.texth}>Hola, Bienvenido: Eduardo Jimenez</Text>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {showIncomeForm ? 'Registrar Ingreso' : 'Registrar Gasto'}
            </Text>

            {showIncomeForm ? (
              <View style={styles.section}>
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
                <TextInput
                  style={styles.input}
                  placeholder="Fecha (YYYY-MM-DD)"
                  value={incomeDate}
                  onChangeText={text => setIncomeDate(text)}
                />
              </View>
            ) : (
              <View style={styles.section}>
                <TextInput
                  style={styles.input}
                  placeholder="Descripción"
                  value={expenseDescription}
                  onChangeText={text => setExpenseDescription(text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Cantidad"
                  keyboardType="numeric"
                  value={expenseAmount}
                  onChangeText={text => setExpenseAmount(text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Fecha (YYYY-MM-DD)"
                  value={expenseDate}
                  onChangeText={text => setExpenseDate(text)}
                />
              </View>
            )}

            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.button, styles.buttonsave]}
                onPress={showIncomeForm ? handleIncomeSubmit : handleExpenseSubmit}>
                <Text style={styles.textStyle}>Guardar</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.textStyle}>Cancelar</Text>
              </Pressable>
            </View>
            
            <Pressable
              style={styles.switchFormButton}
              onPress={() => setShowIncomeForm(!showIncomeForm)}>
              <Text style={styles.switchFormText}>
                {showIncomeForm ? 'Ir a Gastos' : 'Ir a Ingresos'}
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>



      <TouchableOpacity
        style={styles.fabLocation}
        onPress={() => setModalVisible(true)}>
        <View style={styles.fab}>
          <Text style={styles.text}>AGREGAR MOVIMIENTOS AQUI👈🏻:</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    width: "100%",
    backgroundColor: "#0F9B1D",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
    paddingBottom: 15,
  },
  fabLocation: {
    position: "center",
    top: 4,
    right: 20,
  },
  fab: {
    backgroundColor: "#0F921C",
    width: 600,
    height: 40,
    borderRadius: 100,
    justifyContent: "center",
    alignContent: "center",
  },
  fabIcon: {
    color: "white",
    position: 'relative',
    padding: 9,
    fontSize: 21,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 9,
    width: 300, 
    height: 320,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  section: {
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: '100%',
    marginTop: 10,
  },
  button: {
    borderRadius: 15,
    padding: 10,
    elevation: 2,
    flex: 1,
    marginHorizontal: 12,
  },
  buttonsave: {
    backgroundColor: "#0F9B1D",
  },
  buttonCancel: {
    backgroundColor: "red",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  switchFormButton: {
    position: 'absolute',
    bottom: 10,
    right: 15,
  },
  switchFormText: {
    color: "#262626",
    fontWeight: "bold",
    textAlign: "center",
    textDecorationLine: "underline"
  },
  text:{
    color: "#FFF",
    textAlign: "center",
    fontSize: 24,
  },
  texth:{
    color: "#000",
    fontSize: 20,
  }
});
