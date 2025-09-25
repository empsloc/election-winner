import { Feather } from "@expo/vector-icons";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const voteData = [
  { id: "1", center: "Center A", total: 500, voted: 300, notVoted: 200 },
  { id: "2", center: "Center B", total: 600, voted: 450, notVoted: 150 },
  { id: "3", center: "Center C", total: 1000, voted: 600, notVoted: 400 },
  { id: "4", center: "Center D", total: 400, voted: 350, notVoted: 50 },
];

export default function VoteStatsScreen() {
  const handleRefresh = () => {
    console.log("Refreshing vote stats...");
    // Add refresh logic here
  };

  const renderRow = ({ item }: any) => (
    <View className="">
      
    </View>
  );

  const renderHeader = () => (
    <>
      {/* Dashboard / Overall Stats */}
      <View className="m-4 p-4  rounded-2xl ">
        <Text className="text-xl font-bold text-gray-900 mb-4">Overall Statistics</Text>
        <View className="flex-row justify-between space-x-2">
          <View className="flex-1 bg--50 rounded-2xl p-4 items-center">
            <Text className="text-green-700 font-semibold text-base">Voted</Text>
            <Text className="text-green-900 font-bold text-2xl mt-1">1700</Text>
          </View>
          <View className="flex-1 bg-red-50 rounded-2xl p-4 items-center">
            <Text className="text-red-700 font-semibold text-base">Not Voted</Text>
            <Text className="text-red-900 font-bold text-2xl mt-1">800</Text>
          </View>
        </View>
      </View>

      {/* Table Header */}
      <View className="m-4 bg-white rounded-2xl  overflow-hidden">
        <View className="flex-row bg-gray-100 py-3 px-4">
          <Text className="flex-1 text-gray-500 font-semibold">Center</Text>
          <Text className="flex-1 text-gray-500 font-semibold text-center">Total</Text>
          <Text className="flex-1 text-gray-500 font-semibold text-center">Voted</Text>
          <Text className="flex-1 text-gray-500 font-semibold text-center">Not Voted</Text>
          <Text className="flex-1 text-gray-500 font-semibold text-right">Govt Count</Text>
        </View>

        {/* Table Rows inside the rounded container */}
        {voteData.map((item) => (
          <View
            key={item.id}
            className="flex-row py-3 px-4 border-b border-gray-200 items-center bg-white"
          >
            <Text className="flex-1 text-gray-800 font-medium">{item.center} </Text>
            <Text className="flex-1 text-gray-700 text-center">{item.total}</Text>
            <Text className="flex-1 text-green-600 text-center font-semibold">{item.voted}</Text>
            <Text className="flex-1 text-red-600 text-center font-semibold">{item.notVoted}</Text>
            <Text className="flex-1 text-blue-600 text-right font-semibold">{item.total}</Text>
          </View>
        ))}
      </View>
    </>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header with Refresh Button */}
      <View className="flex-row justify-between items-center bg-white p-4 shadow-md">
        <Text className="text-xl font-bold text-gray-900">Vote Stats</Text>
        <TouchableOpacity onPress={handleRefresh} className="p-1 rounded-full bg--100">
          <Feather name="refresh-ccw" size={24} color="#" />
        </TouchableOpacity>
      </View>

      {/* Table */}
      <FlatList
        data={voteData}
        renderItem={renderRow}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={{ paddingBottom: 20 }}
        className="mx-4"
      />
    </SafeAreaView>
  );
}
