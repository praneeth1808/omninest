// app/components/Budget/BudgetHeaderCollapsed.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Import Ionicons

export default function BudgetHeaderCollapsed() {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.iconTextContainer}>
        <Icon name="wallet" size={20} color="#333" />
        <Text style={styles.headerText}>Budget - C</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1, // Make the header take up the full available height
    flexDirection: "row",
    alignItems: "center", // Center items vertically
    justifyContent: "flex-start", // Align items to the left
    paddingHorizontal: 20, // Keep padding to avoid edge cutting
    backgroundColor: "#fafafa",
    width: "100%",
    borderBottomWidth: 2, // Optional bottom border
    borderBottomColor: "#ddd", // Optional border
  },
  iconTextContainer: {
    flexDirection: "row", // Ensure icon and text are in a row
    alignItems: "center", // Align icon and text in the same line
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 10, // Space between icon and text
  },
});
