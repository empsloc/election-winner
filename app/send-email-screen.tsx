import { Feather } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SendEmailScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Header */}
      {/* <View className="flex-row items-center justify-center bg- p-4 -md border-b border-gray-100">
        <Text className="text-lg font-bold text-gray-900">Send Email</Text>
      </View> */}

      <View className="flex-1 justify-center items-center px-6">
        {/* Email Logo */}
        <View className="mb-6">
          <Feather name="mail" size={80} color="#2563eb" />
        </View>

        {/* Title Text */}
        <Text className="text-lg font-semibold text-gray-800 mb-10">
          Choose the email option
        </Text>

        {/* Send Voter List Button */}
        <TouchableOpacity className="w-full bg-blue-600 rounded-2xl p-4 flex-row items-center justify-center mb-5 shadow-md">
          <Feather name="file-text" size={22} color="white" />
          <Text className="text-white font-semibold text-base ml-3">
            Send Voter List
          </Text>
        </TouchableOpacity>

        {/* Send Voter Count Button */}
        <TouchableOpacity className="w-full bg-blue-300 rounded-2xl p-4 flex-row items-center justify-center shadow-md">
          <Feather name="users" size={22} color="#3b82f6" />
          <Text className="text-blue-500 font-semibold text-base ml-3">
            Send Voter Count
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
