import React from 'react';
import { Modal, View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomModal = ({ modalVisible, setModalVisible, incomeDescription, setIncomeDescription, incomeAmount, setIncomeAmount, handleSubmit }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
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
              onPress={handleSubmit}>
              <Text style={styles.textStyle}>Guardar</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.textStyle}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
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
});

export default CustomModal;
