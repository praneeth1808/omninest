// components/BudgetComponent.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Import icons for edit/delete
import { ProgressBar } from "react-native-paper"; // ProgressBar component
import { Dimensions } from "react-native";

// Get screen dimensions for responsive design
const screenWidth = Dimensions.get("window").width;

interface BudgetComponentProps {
  title: string;
  allocatedAmount: number;
  targetAmount: number;
  targetDate: string;
  type: "Goal" | "Want" | "EmergencyFund";
  onAddAmount: () => void;
  onReduceAmount: () => void;
  onDeleteComponent: () => void;
}

export default function BudgetComponent({
  title,
  allocatedAmount,
  targetAmount,
  targetDate,
  type,
  onAddAmount,
  onReduceAmount,
  onDeleteComponent,
}: BudgetComponentProps): JSX.Element {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Determine color based on component type
  const getColor = (): string => {
    switch (type) {
      case "Goal":
        return "#00a000"; // Green for Goals
      case "Want":
        return "#ff0000"; // Red for Wants
      case "EmergencyFund":
        return "#808080"; // Gray for Emergency Funds
      default:
        return "#000"; // Default color
    }
  };

  // Calculate progress for the progress bar
  const progress: number = allocatedAmount / targetAmount;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{type}</Text>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Icon name="create-outline" size={22} color={getColor()} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDeleteComponent}>
            <Icon name="trash-outline" size={22} color={getColor()} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Updated Layout: Display Target Date under amount and above progress bar */}
      <Text style={styles.amountText}>
        Allocated: ${allocatedAmount} / Target: ${targetAmount}
      </Text>
      <Text style={styles.dateText}>Target Date: {targetDate}</Text>

      <ProgressBar
        progress={progress}
        color={getColor()}
        style={styles.progressBar}
      />

      {/* Modal for editing amounts */}
      {isEditing && (
        <Modal transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text>Edit {type} Amounts</Text>
              <TouchableOpacity onPress={onAddAmount}>
                <Text>Add Amount</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onReduceAmount}>
                <Text>Reduce Amount</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsEditing(false)}>
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%", // Full width of the parent container
    marginVertical: 12,
    padding: 15,
    borderRadius: 15, // Rounded corners for a more card-like appearance
    backgroundColor: "#ffffffa8", // White background for the card
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // Shadow for Android
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 20, // Larger title font for more visibility
    fontWeight: "bold",
  },
  actions: {
    flexDirection: "row",
    gap: 15, // Space between action buttons
  },
  amountText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "500",
  },
  dateText: {
    marginTop: 5, // Slight margin between amount and date
    fontSize: 14,
    fontStyle: "italic",
    color: "#555",
  },
  progressBar: {
    height: 12, // Slightly thicker progress bar
    borderRadius: 6, // Rounded progress bar edges
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dimmed background for the modal
  },
  modalContent: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
});
