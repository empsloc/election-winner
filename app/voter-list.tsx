import { Colors } from "@/constants/customTheme";
import { Ionicons } from "@expo/vector-icons";
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

// Example voter data
const voters = [
  { id: "1", name: "Aarav Sharma", email: "aarav.sharma@example.com", serial: "001", voterNumber: "V10001", mobile: "9876543210", updated: true },
  { id: "2", name: "Ishita Gupta", email: "ishita.gupta@example.com", serial: "002", voterNumber: "V10002", mobile: "9876543211", updated: false },
  { id: "3", name: "Rohan Mehta", email: "rohan.mehta@example.com", serial: "003", voterNumber: "V10003", mobile: "9876543212", updated: true },
  { id: "4", name: "Priya Singh", email: "priya.singh@example.com", serial: "004", voterNumber: "V10004", mobile: "9876543213", updated: false },
  { id: "5", name: "Vivaan Kapoor", email: "vivaan.kapoor@example.com", serial: "005", voterNumber: "V10005", mobile: "9876543214", updated: true },
  { id: "6", name: "Ananya Reddy", email: "ananya.reddy@example.com", serial: "006", voterNumber: "V10006", mobile: "9876543215", updated: false },
  { id: "7", name: "Kabir Patel", email: "kabir.patel@example.com", serial: "007", voterNumber: "V10007", mobile: "9876543216", updated: true },
  { id: "8", name: "Saanvi Nair", email: "saanvi.nair@example.com", serial: "008", voterNumber: "V10008", mobile: "9876543217", updated: false },
  { id: "9", name: "Aditya Desai", email: "aditya.desai@example.com", serial: "009", voterNumber: "V10009", mobile: "9876543218", updated: true },
  { id: "10", name: "Meera Joshi", email: "meera.joshi@example.com", serial: "010", voterNumber: "V10010", mobile: "9876543219", updated: false },
  { id: "11", name: "Devansh Chawla", email: "devansh.chawla@example.com", serial: "011", voterNumber: "V10011", mobile: "9876543220", updated: true },
  { id: "12", name: "Tara Bhatia", email: "tara.bhatia@example.com", serial: "012", voterNumber: "V10012", mobile: "9876543221", updated: false },
  { id: "13", name: "Arjun Verma", email: "arjun.verma@example.com", serial: "013", voterNumber: "V10013", mobile: "9876543222", updated: true },
  { id: "14", name: "Nisha Kulkarni", email: "nisha.kulkarni@example.com", serial: "014", voterNumber: "V10014", mobile: "9876543223", updated: false },
  { id: "15", name: "Yash Raj", email: "yash.raj@example.com", serial: "015", voterNumber: "V10015", mobile: "9876543224", updated: true },
];


const screenWidth = Dimensions.get("window").width;
const cardMargin = 16; // margin left+right
const cardWidth = (screenWidth - cardMargin * (numColumns + 1)) / numColumns;

export default function VoterListScreen() {
  const [search, setSearch] = useState("");
  const router = useRouter();


  const filteredVoters = voters.filter(
    (v) =>
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.email.toLowerCase().includes(search.toLowerCase()) ||
      v.serial.includes(search)
  );

  const totalVoters = voters.length;
  const updatedVoters = voters.filter((v) => v.updated).length;
  const unupdatedVoters = totalVoters - updatedVoters;

  const renderVoterCard = ({ item }: any) => (
    <TouchableOpacity
      style={{ width: cardWidth, margin: cardMargin / 2 }}
      className="m-2 bg-white rounded-2xl  p-4"
      onPress={() => router.push({
        pathname: "/editVoter",
        params: { id: item.id }   // pass voter id (or full object if you like)
      })}
    >
      {/* Voter Icon */}
      {/* <View className="bg-blue-100 w-16 h-16 rounded-full items-center justify-center mb-4 self-center">
        <Ionicons name="person-outline" size={32} color={theme.primaryBlue} />
      </View> */}

      {/* Voter Info */}
      <Text className="text-gray-900 font-bold text text-left">
        {item.name}
      </Text>
      <Text className="text-gray-600 text-sm mt-1 text-left">
        Voter No: <Text className="font-semibold">{item.voterNumber}</Text>
      </Text>
      <Text className=" text-gray-600 text-sm  mt-1 text-left">
        Mobile: <Text className="font-semibold">{item.mobile}</Text>
      </Text>
      <Text className="text-gray-600 text-sm mt-1 text-left">
        Serial:<Text className="font-semibold"> {item.serial}</Text>
      </Text>

      {/* Divider */}
      {/* <View className="border-t border-gray-200 my-3" /> */}

      {/* Edit Button */}
      {/* <TouchableOpacity className="bg-blue-500 rounded-xl py-2 px-4 items-center">
        <Text className="text-white font-semibold text-center">Edit Voter</Text>
      </TouchableOpacity> */}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="flex-row justify-between items-center bg-white p-4 shadow-md">
        <Text className="text-lg font-bold text-gray-900">Voter List</Text>

        {/* Unsynced Data */}
        <View className="flex-row items-center gap-1">
          <Ionicons
            name="cloud-offline-outline"
            size={20}
            color={theme.danger}
          />
          <Text className="text-red-600 font-semibold">Unsynced Data: 0</Text>
        </View>
      </View>

      {/* Search Input */}
      <View className="mt-5 px-4">
        <TextInput
          className="h-12 px-3 rounded-md bg-white text-gray-800"
          placeholder="Search by name, email, voter ID or S. number"
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Voter Cards Grid */}
      <FlatList
        data={filteredVoters}
        renderItem={renderVoterCard}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        key={numColumns}
        contentContainerStyle={{ padding: 8, paddingBottom: 100 }} // give space for bottom bar
      />

      {/* Bottom Tab-like Bar */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex-row justify-around items-center p-3">
        <View className="items-center">
          <Text className="text-gray-700 font-semibold">Total</Text>
          <Text className="text-blue-600 font-bold">{totalVoters}</Text>
        </View>
        <View className="items-center">
          <Text className="text-gray-700 font-semibold">Updated</Text>
          <Text className="text-green-600 font-bold">{updatedVoters}</Text>
        </View>
        <View className="items-center">
          <Text className="text-gray-700 font-semibold">Unupdated</Text>
          <Text className="text-red-600 font-bold">{unupdatedVoters}</Text>
        </View>
        <TouchableOpacity className="bg-blue-500 px-4 py-2 rounded-xl">
          <Text className="text-white font-semibold">Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
