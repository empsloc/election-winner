import { Colors } from "@/constants/customTheme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useCallback, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";

// Pick theme manually
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
  { id: "10", name: "test", icon: "bar-chart-outline" },
];

// Add blank element if odd
const formatData = (data: any[], numColumns: number) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);
  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;

  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
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
  const db = useSQLiteContext();
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [voterList, setVoterList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch voter_list
  const fetchVoters = useCallback(async () => {
    try {
      setLoading(true);
      const data = await db.getAllAsync("SELECT * FROM voter_list");
      setVoterList(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch voters:", err);
      setVoterList([]);
    } finally {
      setLoading(false);
    }
  }, [db]);

  const renderCard = ({ item }: any) => {
    if (item.empty) return <View className="flex-1 m-2 p-4" style={{ aspectRatio: 1 }} />;

    return (
      <TouchableOpacity
        className="flex-1 m-2 rounded-lg justify-center items-center p-4"
        style={{ aspectRatio: 1, backgroundColor: theme.card }}
        onPress={() => {
          // Pass voterList as param to all child screens
          const params = { voterList };
          switch (item.name) {
            case "Voter List":
              router.push({
                pathname: "/voter-list",
                params: { voterList: JSON.stringify(voterList) }, // <-- stringify
              });
              break;
            case "Votes":
              router.push({ pathname: "/votes-screen", params });
              break;
            case "Promotional Material":
              router.push({ pathname: "/promotional-material", params });
              break;
            case "Phone Diary":
              router.push({ pathname: "/phone-diary", params });
              break;
            case "Chat":
              router.push({ pathname: "/chat-screen", params });
              break;
            case "Send Email":
              router.push({ pathname: "/send-email-screen", params });
              break;
            case "Booth System":
              router.push({ pathname: "/booth-system-screen", params });
              break;
            case "War Room":
              router.push({ pathname: "/war-room-screen", params });
              break;
            case "Vote Stats":
              router.push({ pathname: "/votes-stats-screen", params });
              break;
            case "test":
              router.push({ pathname: "/test-screen", params });
              break;
          }
        }}
      >
        <View
          style={{
            backgroundColor: theme.iconLight,
            padding: 16,
            borderRadius: 9999,
            marginBottom: 8,
          }}
        >
          <Ionicons name={item.icon} size={32} color={theme.primaryBlue} />
        </View>
        <Text style={{ color: theme.text, textAlign: "center", fontWeight: "500" }}>
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
              dropdownPosition="auto"
              maxHeight={150}
            />
          </View>

          <TouchableOpacity
            onPress={() => router.replace("/")}
            style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
          >
            <Ionicons name="log-out-outline" size={20} color={theme.danger} />
          </TouchableOpacity>
        </View>

        {/* Fetch Button */}
        {/* <View className="p-4">
          <TouchableOpacity
            onPress={fetchVoters}
            className="bg-blue-500 px-4 py-2 rounded-xl flex-row items-center justify-center"
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text className="text-white font-semibold">Fetch Voter List</Text>
            )}
          </TouchableOpacity>
        </View> */}

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
  dropdown: {
    height: 50,
    borderColor: "white",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: { fontSize: 16 },
  selectedTextStyle: { fontSize: 16 },
});
