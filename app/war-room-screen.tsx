import { Feather } from "@expo/vector-icons";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const warRoomData = [
  { id: "1", center: "Center A", total: 500, voted: 300, notVoted: 200 },
  { id: "2", center: "Center B", total: 600, voted: 450, notVoted: 150 },
  { id: "3", center: "Center C", total: 1000, voted: 600, notVoted: 400 },
  { id: "4", center: "Center D", total: 400, voted: 350, notVoted: 50 },
];

export default function WarRoomScreen() {
  const handleRefresh = () => {
    console.log("Refreshing data...");
    // Add actual refresh logic here
  };

  const renderRow = ({ item }: any) => {
    const govtCount = item.total; // Govt count = total

    return (
      <View className="flex-row border-b border-gray-200 py-3 px-4 items-center">
        <Text className="flex-1 text-gray-800 font-medium">{item.center}</Text>
        <Text className="flex-1 text-gray-800 font-medium text-center">{item.total}</Text>
        <Text className="flex-1 text-green-600 font-medium text-center">{item.voted}</Text>
        <Text className="flex-1 text-red-600 font-medium text-center">{item.notVoted}</Text>
        <Text className="flex-1 text-blue-600 font-medium text-right">{govtCount}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Header with Refresh Button */}
      <View className="flex-row justify-between items-center bg-white shadow-sm  p-4 ">
        <Text className="text-lg font-bold text-gray-900">Live Vote Counting</Text>
        <TouchableOpacity onPress={handleRefresh}>
          <Feather name="refresh-ccw" size={24} color="" />
        </TouchableOpacity>
      </View>

      {/* Table Container */}
      <View className="m-4 bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Table Header */}
        <View className="flex-row bg-gray-100 py-3 px-4">
          <Text className="flex-1 text-gray-500 font-semibold">Center</Text>
          <Text className="flex-1 text-gray-500 font-semibold text-center">Total</Text>
          <Text className="flex-1 text-gray-500 font-semibold text-center">Voted</Text>
          <Text className="flex-1 text-gray-500 font-semibold text-center">Not Voted</Text>
          <Text className="flex-1 text-gray-500 font-semibold text-right">Govt Count</Text>
        </View>

        {/* Table Rows */}
        <FlatList
          data={warRoomData}
          renderItem={renderRow}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}
