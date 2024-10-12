// Apps.tsx
import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { Href, useRouter } from "expo-router"; // Import useRouter for navigation

// Get screen width and height using Dimensions API
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// Determine if the device is a mobile device, a MacBook, or a web-based display
const isIOSMobile = Platform.OS === "ios" && screenHeight < 900;
const isMacBook = Platform.OS === "ios" && screenHeight >= 900;
const isWeb = Platform.OS === "web";

// Dynamic styles based on platform and device type
const containerWidth = isIOSMobile
  ? screenWidth * 0.25
  : isWeb
  ? screenWidth * 0.18
  : screenWidth * 0.22;
const containerHeight = isIOSMobile
  ? screenHeight * 0.12
  : isWeb
  ? screenHeight * 0.15
  : screenHeight * 0.12; // Reduced height for compact appearance

// Calculate dynamic padding for spacing
const dynamicPadding = isIOSMobile ? 15 : isWeb ? 30 : 20; // Increased padding for web

// Icon and font sizes based on platform and device
const iconSize = isIOSMobile ? 30 : isWeb ? 50 : 35; // Larger icons for web for visibility
const fontSize = isIOSMobile ? 12 : isWeb ? 18 : 14;

// Adjust margin and spacing for alignment and prevent overflow
const containerMargin = isWeb ? 20 : 10; // Increased margin for web

// Define custom solid background colors for app icons (simplified)
const solidColors = [
  "#FF6F61",
  "#FFA500",
  "#6495ED",
  "#3CB371",
  "#FF69B4",
  "#FF6347",
  "#87CEEB",
];

type PathItem = {
  path: '"/apps/budget" | "/apps" | "/" | "/(tabs)" | "/(tabs)/" | "/(tabs)/apps" | "/_sitemap" | `./${string}` | `../${string}` | ".." | `${string}:${string}`';
};

// Updated list of apps with only 'Budget' available, others grayed out, and 'Nest' removed
const apps = [
  {
    id: "1",
    name: "Budget",
    icon: "wallet",
    color: solidColors[3],
    is_available: true,
    path: "/budget",
  },
  {
    id: "2",
    name: "Nimbus",
    icon: "cloud",
    color: solidColors[0],
    is_available: false,
    path: "/apps",
  },
  {
    id: "3",
    name: "Tasks",
    icon: "checkmark-done-circle",
    color: solidColors[2],
    is_available: false,
    path: "/apps",
  },
  {
    id: "4",
    name: "Health",
    icon: "heart",
    color: solidColors[4],
    is_available: true,
    path: "/health",
  },
  {
    id: "5",
    name: "Fitness",
    icon: "barbell",
    color: solidColors[5],
    is_available: false,
    path: "/apps",
  },
  {
    id: "6",
    name: "Weather",
    icon: "partly-sunny",
    color: solidColors[6],
    is_available: false,
    path: "/apps",
  },
];

// Calculate the number of columns dynamically for web
const calculateColumns = () => {
  if (isWeb) {
    if (screenWidth > 1400) return 5; // 5 columns for very large screens
    if (screenWidth > 1200) return 4; // 4 columns for medium-large screens
    return 3; // Default to 3 columns for smaller screens
  }
  return 3; // Default to 3 columns for iOS
};

// Define the Apps component
export default function Apps() {
  const router = useRouter(); // Use the router hook for navigation
  // Render each app item with an icon and name
  const renderItem = ({
    item,
  }: {
    item: {
      id: string;
      name: string;
      icon: string;
      color: string;
      is_available: boolean;
      path: string;
    };
  }) => (
    <TouchableOpacity
      style={[
        styles.appContainer,
        {
          marginHorizontal: dynamicPadding / 2,
          marginVertical: containerMargin,
          width: containerWidth,
        },
      ]}
      disabled={!item.is_available} // Disable TouchableOpacity if the app is not available
      activeOpacity={item.is_available ? 0.7 : 1} // Change opacity only for available apps
      onPress={() => {
        if (item.is_available && item.path) {
          router.push(item.path.toString() as Href<string | object>); // Navigate to the appropriate path
        }
      }} // Navigate to the path when clicked, only if the app is available and the path is defined
    >
      {/* Icon container with conditional styling for availability */}
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: item.is_available
              ? item.color + "33"
              : `rgba(211, 211, 211, 0.7)`, // Light background color or more transparent gray
            padding: 15,
            borderRadius: 20,
            opacity: item.is_available ? 1 : 0.7, // Slightly reduce opacity if unavailable
            borderColor: item.is_available
              ? item.color
              : `rgba(169, 169, 169, 0.7)`, // Add a border color based on availability
            borderWidth: item.is_available ? 1 : 1.5, // Thicker border for unavailable items
          },
        ]}
      >
        {/* Use the Ionicons with app-specific icon, gray color if not available */}
        <Icon
          name={item.icon}
          size={iconSize}
          color={item.is_available ? item.color : `rgba(169, 169, 169, 0.7)`} // Gray out icon if not available
          style={styles.folderIcon}
        />
      </View>
      {/* Display the app name below the icon container */}
      <Text
        style={[
          styles.appName,
          {
            fontSize,
            color: item.is_available ? "#333" : `rgba(169, 169, 169, 0.7)`, // Gray out text if not available
            textDecorationLine: item.is_available ? "none" : "line-through", // Optional: Strike-through text if unavailable
          },
        ]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Add padding to the top of the entire gallery */}
      <View style={styles.topPadding}></View>
      <Text style={styles.header}>App Gallery</Text>
      {/* Apply dynamic width and height to FlatList */}
      <FlatList
        data={apps} // Pass the list of apps with icons
        renderItem={renderItem} // Render each app with icon and name
        keyExtractor={(item) => item.id} // Unique key for each item
        numColumns={calculateColumns()} // Set number of columns dynamically based on platform
        contentContainerStyle={[
          styles.listContainer,
          {
            width: isWeb ? screenWidth * 0.9 : screenWidth * 0.95, // Adjusted width for web and iOS
            alignItems: "center", // Center align the items within the container
            justifyContent: "center",
          },
        ]}
        showsVerticalScrollIndicator={true} // Show vertical scrollbar
        scrollEnabled={true} // Enable vertical scrolling
        style={{ alignSelf: "center" }} // Center-align the FlatList itself
      />
    </View>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
    backgroundColor: "#f8f8f8", // Use a soft background color for a professional look
    justifyContent: "center", // Center-align the overall container
    alignItems: "center", // Center the App Gallery itself
  },
  topPadding: {
    height: 50, // Add padding at the top of the gallery
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center", // Center-align header text
    color: "#333333", // Slightly darker font color for better contrast
    alignSelf: "center", // Center-align the header
  },
  listContainer: {
    justifyContent: "center", // Center align items within the FlatList container
    alignItems: "center", // Center align the apps within the list
    paddingBottom: 30,
  },
  appContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10, // Increased space between icon and app name for clarity
    elevation: 4, // Elevation for a subtle shadow effect
  },
  folderIcon: {
    marginBottom: 5, // Decreased space between icon and text for a more compact look
  },
  appName: {
    fontWeight: "500", // Slightly bold font for text clarity
    textAlign: "center",
    paddingHorizontal: 5,
    color: "#333", // Darker text color for contrast
  },
});
