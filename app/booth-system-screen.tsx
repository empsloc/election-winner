import { Feather } from "@expo/vector-icons";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const boothData = [
  { id: "1", time: "09:00 AM", electorate: 120, condition: "Smooth" },
  { id: "2", time: "12:00 PM", electorate: 250, condition: "Crowded" },
  { id: "3", time: "03:00 PM", electorate: 400, condition: "Peaceful" },
  { id: "4", time: "06:00 PM", electorate: 550, condition: "Normal" },
];

export default function BoothSystemScreen() {
  const getConditionStyle = (condition: string) => {
    switch (condition) {
      case "Smooth":
        return { bg: "bg-green-100", text: "text-green-700", icon: "#16a34a" };
      case "Crowded":
        return { bg: "bg-red-100", text: "text-red-700", icon: "#dc2626" };
      case "Peaceful":
        return { bg: "bg-blue-100", text: "text-blue-700", icon: "#2563eb" };
      case "Normal":
        return { bg: "bg-yellow-100", text: "text-yellow-700", icon: "#ca8a04" };
      default:
        return { bg: "bg-gray-100", text: "text-gray-700", icon: "#6b7280" };
    }
  };

  const handleRefresh = () => {
    console.log("Refreshing booth data...");
    // Add actual refresh logic here
  };

  const renderRow = ({ item }: any) => {
    const styles = getConditionStyle(item.condition);

    return (
      <View className="flex-row border-b border-gray-200 py-3 px-4 items-center">
        <Text className="flex-1 text-gray-800 font-medium">{item.time}</Text>
        <Text className="flex-1 text-gray-800 font-medium text-center">
          {item.electorate}
        </Text>

        {/* Condition pill with icon */}
        <View
          className={`flex-row items-center justify-end px-3 py-1 rounded-full ${styles.bg}`}
        >
          <Feather name="check-circle" size={16} color={styles.icon} />
          <Text className={`ml-2 font-medium text-sm ${styles.text}`}>
            {item.condition}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Header with Refresh Button */}
      <View className="flex-row justify-between items-center bg-white p-4 shadow-sm">
        <Text className="text-lg font-bold text-gray-900">Booth System</Text>
        <TouchableOpacity onPress={handleRefresh}>
          <Feather name="refresh-ccw" size={24} color="#" />
        </TouchableOpacity>
      </View>

      {/* Table Container */}
      <View className="m-4 bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Table Header */}
        <View className="flex-row bg-gray-100 py-3 px-4">
          <Text className="flex-1 text-gray-500 font-semibold">Time</Text>
          <Text className="flex-1 text-gray-500 font-semibold text-center">
            Total Electorate
          </Text>
          <Text className="flex-1 text-gray-500 font-semibold text-right">
            Condition
          </Text>
        </View>

        {/* Table Rows */}
        <FlatList
          data={boothData}
          renderItem={renderRow}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}
