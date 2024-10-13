import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TextInput,
    TouchableWithoutFeedback,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // Import the Picker component for type selection
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
  onAddAmount: (amount: number) => void;
  onReduceAmount: (amount: number) => void;
  onDeleteComponent: () => void;
  onUpdateTitle: (newTitle: string) => void;
  onUpdateType: (newType: "Goal" | "Want" | "EmergencyFund") => void;
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
  onUpdateTitle,
  onUpdateType,
}: BudgetComponentProps): JSX.Element {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(title); // State to edit title
  const [amountInput, setAmountInput] = useState<string>(""); // State to input amounts
  const [selectedType, setSelectedType] = useState<
    "Goal" | "Want" | "EmergencyFund"
  >(type); // State to handle type changes

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

  // Function to close modal and reset inputs
  const closeModal = () => {
    setIsEditing(false);
    setAmountInput("");
    setNewTitle(title); // Reset title if not saved
    setSelectedType(type); // Reset type if not saved
  };

  // Function to save changes and close modal
  const saveChanges = () => {
    onUpdateTitle(newTitle);
    onUpdateType(selectedType); // Save the selected type
    setIsEditing(false);
    setAmountInput("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Icon name="create-outline" size={22} color={getColor()} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDeleteComponent}>
            <Icon name="trash-outline" size={22} color={getColor()} />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.amountText}>
        Allocated: ${allocatedAmount} / Target: ${targetAmount}
      </Text>
      <Text style={styles.dateText}>Target Date: {targetDate}</Text>

      <ProgressBar
        progress={progress}
        color={getColor()}
        style={styles.progressBar}
      />

      {/* Modal for editing */}
      {isEditing && (
        <Modal
          transparent={true}
          animationType="slide"
          onRequestClose={closeModal} // Handle Android back button
        >
          {/* Detect touch outside the modal */}
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                {/* Modal content should not close when tapped */}
                <View style={styles.modalContent}>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={closeModal}
                  >
                    <Icon name="close-outline" size={28} color="#333" />
                  </TouchableOpacity>

                  <Text style={styles.modalTitle}>Edit {title}</Text>

                  {/* Title Input */}
                  <TextInput
                    style={styles.input}
                    value={newTitle}
                    onChangeText={setNewTitle}
                    placeholder="Edit Title"
                  />

                  {/* New Type Picker */}
                  <View style={styles.pickerContainer}>
                    <Text style={styles.pickerLabel}>Select Type:</Text>
                    <Picker
                      selectedValue={selectedType}
                      onValueChange={(itemValue) => setSelectedType(itemValue)}
                      style={styles.picker}
                    >
                      <Picker.Item label="Goal" value="Goal" />
                      <Picker.Item label="Want" value="Want" />
                      <Picker.Item
                        label="Emergency Fund"
                        value="EmergencyFund"
                      />
                    </Picker>
                  </View>

                  {/* Amount Input Box for Adding */}
                  <View style={styles.amountInputRow}>
                    <TextInput
                      style={styles.amountInput}
                      value={amountInput}
                      onChangeText={setAmountInput}
                      placeholder="Amount"
                      keyboardType="numeric"
                    />
                    <TouchableOpacity
                      onPress={() => onAddAmount(Number(amountInput))}
                    >
                      <Icon
                        name="add-circle-outline"
                        size={28}
                        color="#00a000"
                      />
                    </TouchableOpacity>
                  </View>

                  {/* Amount Input Box for Reducing */}
                  <View style={styles.amountInputRow}>
                    <TextInput
                      style={styles.amountInput}
                      value={amountInput}
                      onChangeText={setAmountInput}
                      placeholder="Amount"
                      keyboardType="numeric"
                    />
                    <TouchableOpacity
                      onPress={() => onReduceAmount(Number(amountInput))}
                    >
                      <Icon
                        name="remove-circle-outline"
                        size={28}
                        color="#ff0000"
                      />
                    </TouchableOpacity>
                  </View>

                  {/* Save Button */}
                  <TouchableOpacity
                    onPress={saveChanges}
                    style={styles.saveButton}
                  >
                    <Text style={styles.saveButtonText}>Save</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 12,
    padding: 15,
    borderRadius: 15,
    backgroundColor: "#ffffffa8",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  actions: {
    flexDirection: "row",
    gap: 15,
  },
  amountText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "500",
  },
  dateText: {
    marginTop: 5,
    fontSize: 14,
    fontStyle: "italic",
    color: "#555",
  },
  progressBar: {
    height: 12,
    borderRadius: 6,
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "85%",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    width: "100%",
    fontSize: 16,
  },
  pickerContainer: {
    marginBottom: 20,
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  picker: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
  },
  amountInputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  amountInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#00a000",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
