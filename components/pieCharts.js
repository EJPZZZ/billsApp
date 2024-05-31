import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PieChart from 'react-native-pie-chart';
import axios from 'axios';

const PieCharts = () => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const expensesResponse = await axios.get('https://api.tectest.click/api/expenses');
      const expensesData = expensesResponse.data;
      const totalExpenses = expensesData.reduce((total, expense) => {
        return total + expense.amount;
      }, 0);
      
      setExpenses(totalExpenses);
  
      const incomeResponse = await axios.get('https://api.tectest.click/api/incomes');
      const incomeData = incomeResponse.data;
      const totalIncome = incomeData.reduce((total, income) => {
        return total + income.amount;
      }, 0);
      
      setIncome(totalIncome);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(fetchData, 2000); 
    return () => clearInterval(intervalId); 
  }, []);

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  const totalSeries = income + expenses;
  if (totalSeries === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No se encontraron datos de ingresos o gastos</Text>
      </View>
    );
  }

  const widthAndHeight = 200;
  const series = [income, expenses];
  const sliceColor = ['#0aa324', '#F44336'];
  const labels = ["Ingresos", "Gastos"];

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={sliceColor}
          coverRadius={.70}
        />
      </View>
      <View style={styles.legendContainer}>
        {labels.map((label, index) => (
          <View style={styles.legendItem} key={index}>
            <View style={[styles.colorIndicator, { backgroundColor: sliceColor[index] }]} />
            <Text style={styles.legendText}>{label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartContainer: {
    marginRight: 20,
  },
  legendContainer: {
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  colorIndicator: {
    width: 10,
    height: 10,
    marginRight: 10,
  },
  legendText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'black',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});

export default PieCharts;
