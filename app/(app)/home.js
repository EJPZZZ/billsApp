import React from "react";
import { View, StyleSheet, Text, } from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import { MaterialIcons } from '@expo/vector-icons';

export default function home() {
  const data = {
    labels: ["Gastos", "Ingresos"], 
    data: [0.4, 0.6]
  };

  const chartConfig = {
    backgroundGradientFrom: "#5a03d5",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(265, 97, 42, ${opacity})`,
    strokeWidth: 2, 
    barPercentage: 0.5,
    useShadowColorFromDataset: false 
  };
  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <ProgressChart
          data={data}
          width={320}
          height={220}
          strokeWidth={16}
          radius={32}
          chartConfig={chartConfig}
          hideLegend={false}
        />
      </View>

      <View style={styles.card}>
      <MaterialIcons name="attach-money" size={50} color="green" />
      <Text style={styles.amount}> 5000.00</Text>
      </View>
      <View style={styles.card}>
      <MaterialIcons name="money-off" size={50} color="red" />
      <Text style={styles.amount}> 900.00</Text>
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
  chartContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "98%",
    padding: 24,
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

  card: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "100%",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 15,
    marginBottom: 20,
    flexDirection: "row",
  },

  amount: {
    fontSize: 34,
    fontWeight: 600,
  },
   circleButtonContainer: {
    width: 84,
    height: 84,
    marginHorizontal: 60,
    borderWidth: 4,
    borderColor: '#ffd33d',
    borderRadius: 42,
    padding: 3,
  },
  circleButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 42,
    backgroundColor: '#fff',
  },
  
});
