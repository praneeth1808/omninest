// app/apps/budget/index.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function BudgetPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Budget</Text>

      {/* Content section */}
      <View style={styles.budgetContent}>
        <Text style={styles.text}>
          This is where the Budget details will go.
        </Text>
        {/* Add more budget-related components here */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "#f8f8f8",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  budgetContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0f7f8",
    borderRadius: 10,
    width: "90%",
    padding: 20,
  },
  text: {
    fontSize: 18,
    color: "#333",
  },
});
