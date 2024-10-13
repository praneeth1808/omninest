// budget/index.tsx
import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import BudgetHeader from "@/components/Budget/BudgetHeader"; // Import BudgetHeader component
import BudgetComponents from "@/components/Budget/BudgetComponents"; // Updated path for BudgetComponents container

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function BudgetPage(): JSX.Element {
  const [isHeaderExpanded, setIsHeaderExpanded] = useState<boolean>(false); // State to manage the header's expand/collapse

  // Toggle the expand/collapse state
  const toggleHeader = (): void => {
    setIsHeaderExpanded(!isHeaderExpanded);
  };

  const [components, setComponents] = useState([
    {
      title: "Saving for a Car",
      allocatedAmount: 300,
      targetAmount: 500,
      targetDate: "Dec 2024",
      type: "Goal",
    },
    {
      title: "Vacation Fund",
      allocatedAmount: 200,
      targetAmount: 300,
      targetDate: "Nov 2024",
      type: "Goal",
    },
    {
      title: "New Laptop",
      allocatedAmount: 100,
      targetAmount: 500,
      targetDate: "Oct 2024",
      type: "Want",
    },
    {
      title: "Emergency Savings",
      allocatedAmount: 150,
      targetAmount: 200,
      targetDate: "Jan 2025",
      type: "EmergencyFund",
    },
    {
      title: "Home Renovation",
      allocatedAmount: 500,
      targetAmount: 1000,
      targetDate: "Aug 2025",
      type: "Goal",
    },
    {
      title: "Wedding Expenses",
      allocatedAmount: 400,
      targetAmount: 1500,
      targetDate: "May 2025",
      type: "Want",
    },
    {
      title: "College Fund",
      allocatedAmount: 800,
      targetAmount: 2000,
      targetDate: "Dec 2026",
      type: "EmergencyFund",
    },
  ]);

  // Function to handle adding an amount
  const handleAddAmount = (index: number): void => {
    const updatedComponents = [...components];
    updatedComponents[index].allocatedAmount += 100; // Add 100 for example
    setComponents(updatedComponents);
  };

  // Function to handle reducing an amount
  const handleReduceAmount = (index: number): void => {
    const updatedComponents = [...components];
    if (updatedComponents[index].allocatedAmount > 0) {
      updatedComponents[index].allocatedAmount -= 100; // Reduce 100 for example
      setComponents(updatedComponents);
    }
  };

  // Function to handle deleting a component
  const handleDeleteComponent = (index: number): void => {
    const updatedComponents = components.filter((_, i) => i !== index);
    setComponents(updatedComponents);
  };

  return (
    <View style={styles.container}>
      {/* Use BudgetHeader component and pass the expanded state */}
      <View
        style={{
          height: isHeaderExpanded ? screenHeight * 0.27 : screenHeight * 0.07, // Adjust height dynamically
        }}
      >
        <BudgetHeader
          isExpanded={isHeaderExpanded}
          toggleExpanded={toggleHeader}
        />
      </View>

      {/* Bottom section adjusts dynamically based on header height */}
      <View
        style={[
          styles.budgetContent,
          {
            height: isHeaderExpanded ? screenHeight * 0.6 : screenHeight * 0.8,
            width: screenWidth,
          },
        ]}
      >
        {/* Display budget components and pass width percentage */}
        <BudgetComponents
          components={components.map((component, index) => ({
            title: component.title,
            allocatedAmount: component.allocatedAmount,
            targetAmount: component.targetAmount,
            targetDate: component.targetDate,
            type: component.type as "Goal" | "Want" | "EmergencyFund",
            onAddAmount: () => handleAddAmount(index),
            onReduceAmount: () => handleReduceAmount(index),
            onDeleteComponent: () => handleDeleteComponent(index),
          }))}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e4e4e4", // Set background to a light gray tone
    paddingTop: 50, // Padding to prevent overlap with the top status bar
  },
  budgetContent: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    elevation: 5, // Shadow for Android
  },
});
