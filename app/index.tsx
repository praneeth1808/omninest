import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { ThemedText } from "@/components/ThemedText"; // Themed text component
import { ThemedView } from "@/components/ThemedView"; // Themed view component for dark/light mode
import { HelloWave } from "@/components/HelloWave"; // Waving animation/icon for friendly greeting
import { useNavigation } from "@react-navigation/native"; // Navigation hook

export default function WelcomeScreen() {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    // Navigate to the main section of the app (Apps or Budget)
    navigation.navigate("apps"); // Adjust this to your app's main entry point
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Logo and Introduction */}
        <Image
          source={require("@/assets/images/omninest-logo.png")} // Adjust with your app's logo
          style={styles.logo}
        />
        <View style={styles.introContainer}>
          <ThemedText type="title" style={styles.titleText}>
            Welcome to OmniNest!
          </ThemedText>
          <HelloWave />
        </View>

        {/* Overview Section */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Why OmniNest?
          </ThemedText>
          <ThemedText type="default" style={styles.bodyText}>
            OmniNest is your all-in-one digital home, providing a suite of apps
            designed to simplify your life. Whether you're managing your budget,
            planning future goals, or tracking essential tasks, OmniNest is the
            place where all your apps come together in harmony.
          </ThemedText>
        </View>

        {/* Budget App Explanation */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Budget: Take Control of Your Finances
          </ThemedText>
          <ThemedText type="default" style={styles.bodyText}>
            OmniNest's **Budget** app is a comprehensive tool designed to help
            you manage your finances. Create and manage **Goals**, allocate
            funds for **Wants**, and ensure you're always prepared with
            **Emergency Funds**. Whether you're saving for big purchases or
            planning for life’s unexpected expenses, our budgeting tool makes it
            easy to track, allocate, and adjust your funds over time.
          </ThemedText>
        </View>

        {/* More Apps Section */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            What’s Next?
          </ThemedText>
          <ThemedText type="default" style={styles.bodyText}>
            OmniNest is continually growing! Alongside **Budget**, we’re working
            on new apps to simplify your life—whether it's fitness tracking,
            task management, or something entirely new. Stay tuned as more apps
            come into the OmniNest ecosystem to help you manage all aspects of
            your life in one place.
          </ThemedText>
        </View>

        {/* About Us Section */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            About Us
          </ThemedText>
          <ThemedText type="default" style={styles.bodyText}>
            At **OmniNest**, we are committed to creating seamless, intuitive
            applications that help users manage their lives with ease. Our
            vision is to build a unified digital environment where everything
            you need is just a tap away. Whether it’s budgeting, planning, or
            organizing, OmniNest is here to empower you with the right tools.
          </ThemedText>
        </View>

        {/* Get Started Button */}
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={handleGetStarted}
        >
          <ThemedText type="defaultSemiBold" style={styles.buttonText}>
            Get Started
          </ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8", // Neutral background color for readability
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 20,
    resizeMode: "contain", // Maintain aspect ratio for logo
  },
  introContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  titleText: {
    fontSize: 28,
    fontWeight: "bold",
    marginRight: 10,
  },
  section: {
    marginBottom: 30,
    width: "100%",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555", // Subtle text color for body content
  },
  getStartedButton: {
    marginTop: 30,
    paddingVertical: 15,
    paddingHorizontal: 40,
    backgroundColor: "#00a000", // Green button to align with app’s primary color
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
