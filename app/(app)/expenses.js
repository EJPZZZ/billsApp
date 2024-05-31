import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, Modal, TextInput, Button } from "react-native";
import axios from 'axios';
import PieCharts from "../../components/pieCharts";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [editedDescription, setEditedDescription] = useState("");
  const [editedAmount, setEditedAmount] = useState("");
  const [editedDate, setEditedDate] = useState("");

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('https://api.tectest.click/api/expenses');
      setExpenses(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      setLoading(false);
    }
  };

  const fetchIncomes = async () => {
    try {
      const response = await axios.get('https://api.tectest.click/api/incomes');
      setIncomes(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching incomes:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
    fetchIncomes();

    const intervalId = setInterval(() => {
      fetchExpenses();
      fetchIncomes();
    }, 2000); 

    return () => clearInterval(intervalId); 
  }, []);

  const handleDelete = async (id, type) => {
    try {
      const endpoint = type === 'expense' ? 'expenses' : 'incomes';
      await axios.delete(`https://api.tectest.click/api/${endpoint}/${id}`);
      if (type === 'expense') {
        setExpenses(expenses.filter(item => item.id !== id));
      } else {
        setIncomes(incomes.filter(item => item.id !== id));
      }
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
    }
  };

  const handleEdit = (transaction, type) => {
    setCurrentTransaction({ ...transaction, type });
    setEditedDescription(transaction.description);
    setEditedAmount(transaction.amount.toString());
    setEditedDate(transaction.date);
    setModalVisible(true);
  };

  const saveEdit = async () => {
    try {
      const updatedTransaction = {
        description: editedDescription.trim(),
        amount: parseFloat(editedAmount),
        date: editedDate.trim(),
        user_id: currentTransaction.user_id,
      };

      if (isNaN(updatedTransaction.amount) || !/^\d{4}-\d{2}-\d{2}$/.test(updatedTransaction.date)) {
        Alert.alert("Error", "YYYY-MM-DD format.");
        return;
      }

      const endpoint = currentTransaction.type === 'expense' ? 'expenses' : 'incomes';
      const response = await axios.put(
        `https://api.tectest.click/api/${endpoint}/${currentTransaction.id}`,
        updatedTransaction,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        if (currentTransaction.type === 'expense') {
          setExpenses(prevExpenses => {
            return prevExpenses.map(item =>
              item.id === currentTransaction.id ? { ...item, ...updatedTransaction } : item
            );
          });
        } else {
          setIncomes(prevIncomes => {
            return prevIncomes.map(item =>
              item.id === currentTransaction.id ? { ...item, ...updatedTransaction } : item
            );
          });
        }
        setModalVisible(false);
      } else {
        Alert.alert("Error", `Failed to update ${currentTransaction.type}. Status code: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error editing ${currentTransaction.type}:`, error);
      if (error.response) {
        Alert.alert("Error", `Failed to update ${currentTransaction.type}. Status code: ${error.response.status}. Message: ${error.response.data.message}`);
      } else if (error.request) {
        Alert.alert("Error", `Failed to update ${currentTransaction.type}. No response from server.`);
      } else {
        Alert.alert("Error", `Failed to update ${currentTransaction.type}. Error: ${error.message}`);
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.main}
      >
        <View style={styles.card}>
          <PieCharts />
        </View>

        <View style={styles.separatorContainer}>
          <Text style={styles.separatorText}>Movimientos</Text>
        </View>
        <View style={{ height: 2, backgroundColor: "#262626", marginBottom: 10 }}></View>

        <Text style={styles.sectionTitle}>Ingresos</Text>
        {incomes.map((income) => (
          <View key={income.id} style={styles.item}>
            <Image source={require('../../assets/iconIncomes.png')} style={styles.itemImage} />
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemTitle}>Monto: ${income.amount}</Text>
              <Text style={styles.itemDescription}>{income.description}</Text>
              <Text style={styles.itemDescription}>{income.date}</Text>
            </View>

            <View style={styles.icons}>
              <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => handleEdit(income, 'income')}>
                <FontAwesome5 name="edit" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(income.id, 'income')}>
                <AntDesign name="closecircle" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Gastos</Text>
        {expenses.map((expense) => (
          <View key={expense.id} style={styles.item}>
            <Image source={require('../../assets/iconExpenses.png')} style={styles.itemImage} />
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemTitle}>Monto: ${expense.amount}</Text>
              <Text style={styles.itemDescription}>{expense.description}</Text>
              <Text style={styles.itemDescription}>{expense.date}</Text>
            </View>

            <View style={styles.icons}>
              <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => handleEdit(expense, 'expense')}>
                <FontAwesome5 name="edit" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(expense.id, 'expense')}>
                <AntDesign name="closecircle" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Editar Movimiento</Text>
          <TextInput
            style={styles.input}
            value={editedDescription}
            onChangeText={setEditedDescription}
            placeholder="Descripción"
          />
          <TextInput
            style={styles.input}
            value={editedAmount}
            onChangeText={setEditedAmount}
            keyboardType="numeric"
            placeholder="Monto"
          />
          <TextInput
            style={styles.input}
            value={editedDate}
            onChangeText={setEditedDate}
            placeholder="Fecha (YYYY-MM-DD)"
          />
          <View style={styles.buttonContainer}>
            <Button title="Guardar" onPress={saveEdit} />
            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
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
    maxWidth: 960,
    marginBottom: 60,
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "100%",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 80,
    marginBottom: 20,
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
  separatorContainer: {
    width: '100%',
    marginBottom: 5,
  },
  separatorText: {
    fontSize: 18,
    color: '#555',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
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
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    width: '100%',
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: '100%',
    marginTop: 10,
  },
});
