// app/apps/budget/index.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import BudgetHeader from "@/components/Budget/BudgetHeader"; // Import expanded BudgetHeader
import BudgetHeaderCollapsed from "@/components/Budget/BudgetHeaderCollapsed"; // Import collapsed BudgetHeader

export default function BudgetPage() {
  const [headerCollapsed, setHeaderCollapsed] = useState(false); // State to toggle header

  const screenHeight = Dimensions.get("window").height;

  // Function to toggle the header
  const toggleHeader = () => {
    setHeaderCollapsed(!headerCollapsed);
  };

  return (
    <View style={styles.container}>
      {/* Collapsible Header - switch between BudgetHeaderCollapsed and BudgetHeader */}
      <TouchableOpacity onPress={toggleHeader}>
        <View
          style={{
            height: headerCollapsed ? screenHeight * 0.1 : screenHeight * 0.25,
          }}
        >
          {headerCollapsed ? <BudgetHeaderCollapsed /> : <BudgetHeader />}
        </View>
      </TouchableOpacity>
      {/* Bottom section adjusts dynamically based on header height */}
      <View
        style={[
          styles.budgetContent,
          {
            height: headerCollapsed ? screenHeight * 0.81 : screenHeight * 0.66,
          },
        ]}
      >
        <Text style={styles.text}>
          This is where the Budget details will go.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2", // Soft neutral background
    paddingBottom: 20, // Padding to prevent overlap with the bottom tab
    marginTop: 25, // Add margin to prevent overlap with the top header
  },
  budgetContent: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0f7f8", // Slight blue tone for content background
    borderRadius: 20,
    width: "90%",
    alignSelf: "center",
    padding: 30,
    borderWidth: 1, // Add green accent to the border
    borderColor: "#00a000", // Minimal green accent
    shadowColor: "#000", // Add shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Shadow for Android
  },
  text: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
  },
});
