import { Colors } from "@/constants/customTheme";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
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

// Sample voter data
const voters = [
    { id: "1", name: "Aarav Sharma", voterNumber: "V10001", mobile: "9876543210", voted: false, party: "BJP" },
    { id: "2", name: "Ishita Gupta", voterNumber: "V10002", mobile: "9876543211", voted: false, party: "Congress" },
    { id: "3", name: "Rohan Mehta", voterNumber: "V10003", mobile: "9876543212", voted: true, party: "NCP" },
    { id: "4", name: "Priya Singh", voterNumber: "V10004", mobile: "9876543213", voted: false, party: "Shiv Sena" },
    { id: "5", name: "Vivaan Kapoor", voterNumber: "V10005", mobile: "9876543214", voted: true, party: "BJP" },
    { id: "6", name: "Ananya Reddy", voterNumber: "V10006", mobile: "9876543215", voted: false, party: "Congress" },
    { id: "7", name: "Kabir Patel", voterNumber: "V10007", mobile: "9876543216", voted: true, party: "NCP" },
    { id: "8", name: "Saanvi Nair", voterNumber: "V10008", mobile: "9876543217", voted: false, party: "Shiv Sena" },
    { id: "9", name: "Aditya Desai", voterNumber: "V10009", mobile: "9876543218", voted: true, party: "BJP" },
    { id: "10", name: "Meera Joshi", voterNumber: "V10010", mobile: "9876543219", voted: false, party: "Congress" },
    { id: "11", name: "Devansh Chawla", voterNumber: "V10011", mobile: "9876543220", voted: true, party: "NCP" },
    { id: "12", name: "Tara Bhatia", voterNumber: "V10012", mobile: "9876543221", voted: false, party: "Shiv Sena" },
    { id: "13", name: "Arjun Verma", voterNumber: "V10013", mobile: "9876543222", voted: true, party: "BJP" },
    { id: "14", name: "Nisha Kulkarni", voterNumber: "V10014", mobile: "9876543223", voted: false, party: "Congress" },
    { id: "15", name: "Yash Raj", voterNumber: "V10015", mobile: "9876543224", voted: true, party: "NCP" },
  ];
  

const parties = ["All Parties", "BJP", "Congress", "NCP", "Shiv Sena", "Other"];

export default function VotesScreen() {
  const [search, setSearch] = useState("");
  const [selectedParty, setSelectedParty] = useState("All Parties");
  const [voterList, setVoterList] = useState(voters);

  const router = useRouter();

  const filteredVoters = voterList.filter((v) => {
    const matchesSearch =
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.voterNumber.toLowerCase().includes(search.toLowerCase()) ||
      v.mobile.includes(search);
    const matchesParty = selectedParty === "All Parties" || v.party === selectedParty;
    return matchesSearch && matchesParty;
  });

  const toggleVote = (id: string) => {
    setVoterList((prev) =>
      prev.map((v) =>
        v.id === id ? { ...v, voted: !v.voted } : v
      )
    );
  };

  const renderVoterCard = ({ item }: any) => (
    <View
      style={{ width: cardWidth, margin: cardMargin / 2 }}
      className="m-2 bg-white rounded-3xl  p-4"
    >
      {/* Voter Info */}
      <Text className="text-gray-900 font-bold text-left text-lg">{item.name}</Text>
      <Text className="text-gray-600 text-sm mt-1 text-left">
        Voter No: <Text className="font-semibold">{item.voterNumber}</Text>
      </Text>
      <Text className="text-gray-600 text-sm mt-1 text-left">
        Mobile: <Text className="font-semibold">{item.mobile}</Text>
      </Text>
  
      {/* Divider */}
      <View className="border-t border-gray-200 my-3" />
  
      {/* Vote Button */}
      <TouchableOpacity
        className={`mt-2 py-3 rounded-full ${
          item.voted ? "bg-green-500" : "bg-gray-300"
        } `}
        onPress={() => toggleVote(item.id)}
        activeOpacity={0.8}
      >
        <Text
          className={`text-center font-semibold ${
            item.voted ? "text-white" : "text-gray-700"
          }`}
        >
          {item.voted ? "Voted" : "Not Voted"}
        </Text>
      </TouchableOpacity>
    </View>
  );
  


  

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="flex-row justify-between items-center bg-white p-4 shadow-md">
        <Text className="text-lg font-bold text-gray-900">Votes</Text>
        <View className="flex-row items-center gap-1">
          <Ionicons name="cloud-offline-outline" size={20} color={theme.danger} />
          <Text className="text-red-600 font-semibold">Unsynced Data: 0</Text>
        </View>
      </View>

      {/* Search + Party Filter */}
      <View className="mt-5 px-4 flex-row items-center gap-2">
        <TextInput
          className="flex-1 h-12 px-3 rounded-md bg-white text-gray-800"
          placeholder="Search by name, voter ID or mobile"
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
        />

        <View className="bg-white rounded-md border border-gray-300 overflow-hidden">
          <Picker
            selectedValue={selectedParty}
            onValueChange={setSelectedParty}
            placeholder="Select Party"
            style={{ height: 50, width: 150 }}
          >
            {parties.map((p, idx) => (
              <Picker.Item key={idx} label={p} value={p} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Voter Cards */}
      <FlatList
        data={filteredVoters}
        renderItem={renderVoterCard}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        key={numColumns}
        contentContainerStyle={{ padding: 8, paddingBottom: 100 }}
      />
    </SafeAreaView>
  );
}
