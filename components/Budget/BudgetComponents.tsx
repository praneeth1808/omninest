// components/Budget/BudgetComponents.tsx
import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import BudgetComponent from "@/components/Budget/BudgetComponent"; // Import the individual budget component

// Define the props for each budget component data
interface BudgetComponentData {
  allocatedAmount: number;
  targetAmount: number;
  targetDate: string;
  type: "Goal" | "Want" | "EmergencyFund";
  onAddAmount: () => void;
  onReduceAmount: () => void;
  onDeleteComponent: () => void;
  widthPercentage: number; // New prop for dynamic width percentage
}

// Define the props for the BudgetComponents container
interface BudgetComponentsProps {
  components: BudgetComponentData[]; // Correct type for components array
}

export default function BudgetComponents({
  components,
}: BudgetComponentsProps): JSX.Element {
  return (
    <ScrollView>
      {components
        .sort((a, b) => {
          // Sorting logic to ensure goals come first, followed by wants, then emergency funds
          const order = { Goal: 1, Want: 2, EmergencyFund: 3 };
          return order[a.type] - order[b.type];
        })
        .map((component, index) => (
          <BudgetComponent
            key={index}
            allocatedAmount={component.allocatedAmount}
            targetAmount={component.targetAmount}
            targetDate={component.targetDate}
            type={component.type}
            onAddAmount={component.onAddAmount}
            onReduceAmount={component.onReduceAmount}
            onDeleteComponent={component.onDeleteComponent}
            widthPercentage={component.widthPercentage} // Dynamic width passed from parent
          />
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    width: "100%", // Ensure the scroll container uses the full width of the parent
  },
  componentContainer: {
    width: "100%", // Each component takes up 100% of its parent
    borderRadius: 10, // Slight rounding of the corners for a softer look
    paddingLeft: 15, // Padding inside the border to ensure content is not touching the edges
    paddingRight: 15, // Padding inside the border to ensure content is not touching the edges
    paddingTop: 10, // Padding inside the border to ensure content is not touching the edges
    elevation: 3, // Shadow for Android
  },
});
