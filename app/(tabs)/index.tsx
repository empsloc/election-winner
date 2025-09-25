import { Colors } from "@/constants/customTheme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";

// Pick theme manually (switch light/dark here)
const theme = Colors.light;

const cards = [
  { id: "1", name: "Voter List", icon: "people-outline" },
  { id: "2", name: "Votes", icon: "stats-chart-outline" },
  { id: "3", name: "Promotional Material", icon: "megaphone-outline" },
  { id: "4", name: "Booth System", icon: "business-outline" },
  { id: "5", name: "Phone Diary", icon: "call-outline" },
  { id: "6", name: "Chat", icon: "chatbubble-ellipses-outline" },
  { id: "7", name: "Send Email", icon: "mail-outline" },
  { id: "8", name: "War Room", icon: "shield-checkmark-outline" },
  { id: "9", name: "Vote Stats", icon: "bar-chart-outline" },
];

// Helper to add a blank item if list has odd count
const formatData = (data: any[], numColumns: number) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);
  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;

  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({ id: `blank-${data.length}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};

const data = [
  { label: "Center 1", value: "1" },
  { label: "Center 2", value: "2" },
  { label: "Center 3", value: "3" },
];
export default function DashboardScreen() {
  const router = useRouter();
  const [selectedValue, setSelectedValue] = useState(null);

  const renderCard = ({ item }: any) => {
    if (item.empty) {
      // Empty placeholder keeps layout balanced
      return <View className="flex-1 m-2 p-4" style={{ aspectRatio: 1 }} />;
    }

    return (
      <TouchableOpacity
        className="flex-1 m-2 rounded-lg -md justify-center items-center p-4"
        style={{ aspectRatio: 1, backgroundColor: theme.card }}
        onPress={() => {
          if (item.name === "Voter List") {
            router.push("/voter-list"); // navigate to voter list screen
          }
          else if (item.name === "Votes") {
            router.push("/votes-screen"); // navigate to voter list screen
          }
          else if (item.name === "Promotional Material") {
            router.push("/promotional-material"); // navigate to voter list screen
          }
          else if (item.name === "Phone Diary") {
            router.push("/phone-diary"); // navigate to voter list screen
          }
          else if (item.name === "Chat") {
            router.push("/chat-screen"); // navigate to voter list screen
          }
          else if (item.name === "Send Email") {
            router.push("/send-email-screen"); // navigate to voter list screen
          }
          else if (item.name === "Booth System") {
            router.push("/booth-system-screen"); // navigate to voter list screen
          }
          else if (item.name === "War Room") {
            router.push("/war-room-screen"); // navigate to voter list screen
          }
          else if (item.name === "Vote Stats") {
            router.push("/votes-stats-screen"); // navigate to voter list screen
          }
         
        }}
      >
        {/* Light circle + Blue icon */}
        <View
          style={{
            backgroundColor: theme.iconLight, // new lighter background
            padding: 16,
            borderRadius: 9999,
            marginBottom: 8,
          }}
        >
          <Ionicons name={item.icon} size={32} color={theme.primaryBlue} />
        </View>

        <Text
          style={{ color: theme.text, textAlign: "center", fontWeight: "500" }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        {/* App Bar */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: theme.card,
            padding: 16,
            shadowOpacity: 0.1,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: theme.text }}>
            Dashboard
          </Text>

          <View style={{ width: 150 }}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={data}
              labelField="label"
              valueField="value"
              placeholder="Select center"
              value={selectedValue}
              onChange={(item) => setSelectedValue(item.value)}
              // Make sure dropdown appears above other elements
              dropdownPosition="auto"
              maxHeight={150}
            />
          </View>

          <TouchableOpacity
            onPress={() => router.replace("/")}
            style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
          >
            <Ionicons name="log-out-outline" size={20} color={theme.danger} />
            {/* <Text style={{ color: theme.danger, fontWeight: "500" }}>Logout</Text> */}
          </TouchableOpacity>
        </View>

        {/* Cards Grid */}
        <FlatList
          data={formatData([...cards], 2)}
          renderItem={renderCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={{ padding: 8 }}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  dropdown: {
    height: 50,
    borderColor: "white",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
});
