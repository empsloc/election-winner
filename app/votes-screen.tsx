import { Colors } from "@/constants/customTheme";
import { useVoters } from "@/context/VoterContext";
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const theme = Colors.light;
const numColumns = 2;
const screenWidth = Dimensions.get("window").width;
const cardMargin = 16;
const cardWidth = (screenWidth - cardMargin * (numColumns + 1)) / numColumns;

export default function VotesScreen() {
  const router = useRouter();
  const { voters, setVoters } = useVoters(); // ✅ use context

  const [search, setSearch] = useState("");
  const [selectedParty, setSelectedParty] = useState("All Parties");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const parties = ["All Parties", "BJP", "Congress", "NCP", "Shiv Sena", "Other"];

  // Toggle vote and update state in context
  const toggleVote = (voter: any) => {
    if (voter.voted) return;
    setUpdatingId(voter.id);

    // Update voters array immutably in context
    const updatedVoters = voters.map((v) =>
      v.id === voter.id ? { ...v, voted: 1 } : v
    );
    setVoters(updatedVoters);
    setUpdatingId(null);
  };

  const filteredVoters = useMemo(() => {
    return voters.filter((v) => {
      const matchesSearch =
        v.name.toLowerCase().includes(search.toLowerCase()) ||
        v.voter_id?.toLowerCase().includes(search.toLowerCase()) ||
        v.mobile?.includes(search);
      const matchesParty = selectedParty === "All Parties" || v.party === selectedParty;
      return matchesSearch && matchesParty;
    });
  }, [voters, search, selectedParty]);

  const renderVoterCard = ({ item }: any) => (
    <View style={{ width: cardWidth, margin: cardMargin / 2 }} className="m-2 bg-white rounded-3xl p-4">
      <Text className="text-gray-900 font-bold text-left text-lg">{item.name}</Text>
      <Text className="text-gray-600 text-sm mt-1 text-left">
        Voter No: <Text className="font-semibold">{item.voterNumber}</Text>
      </Text>
      <Text className="text-gray-600 text-sm mt-1 text-left">
        Mobile: <Text className="font-semibold">{item.mobile}</Text>
      </Text>
      <Text className="text-gray-600 text-sm mt-1 text-left">
        Party: <Text className="font-semibold">{item.party || "-"}</Text>
      </Text>

      <View className="border-t border-gray-200 my-3" />

      <TouchableOpacity
        className={`mt-2 py-3 rounded-full ${item.voted ? "bg-green-500" : "bg-gray-300"}`}
        onPress={() => toggleVote(item)}
        activeOpacity={0.8}
        disabled={updatingId === item.id}
      >
        {updatingId === item.id ? (
          <ActivityIndicator size="small" color="#fff" className="text-center" />
        ) : (
          <Text className={`text-center font-semibold ${item.voted ? "text-white" : "text-gray-700"}`}>
            {item.voted ? "Voted" : "Vote"}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="flex-row justify-between items-center bg- p-4 -md">
      <TouchableOpacity onPress={() => router.back()} className="p-2">
    <MaterialIcons name="arrow-back" size={24} color="#111827" />
  </TouchableOpacity>

        
        <Text className="text-lg font-bold text-gray-900">Votes</Text>
      </View>

      {/* Search + Party Picker */}
      <View className="mt-5 px-4 flex-row items-center gap-2">
        <TextInput
          className="flex-1 h-12 px-3 rounded-md bg-white text-gray-800"
          placeholder="Search by name, voter ID or mobile"
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
        />
        <View className="bg-white rounded-md border border-gray-300">
          <Picker
            selectedValue={selectedParty}
            onValueChange={(itemValue) => setSelectedParty(itemValue)}
            style={{ height: 51, width: 160 }}
          >
            {parties.map((party) => (
              <Picker.Item key={party} label={party} value={party} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Voter List */}
      {voters.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text className="mt-4 text-gray-600 text-lg">No voters available</Text>
        </View>
      ) : (
        <FlatList
  data={filteredVoters}
  renderItem={renderVoterCard}
  keyExtractor={(item) => item.id.toString()} // convert number to string
  numColumns={numColumns}
  key={numColumns}
  contentContainerStyle={{ padding: 8, paddingBottom: 100 }}
/>

      )}
    </SafeAreaView>
  );
}
