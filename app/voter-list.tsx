import type { Voter } from "@/context/VoterContext"; // ✅ import the shared type
import { useVoters } from "@/context/VoterContext";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import {
  Dimensions,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const numColumns = 2;
const screenWidth = Dimensions.get("window").width;
const cardMargin = 16;
const cardWidth = (screenWidth - cardMargin * (numColumns + 1)) / numColumns;

// ✅ VoterCard uses the same Voter type as context
const VoterCard = React.memo(function VoterCardComponent({
  item,
  onPress,
}: {
  item: Voter;
  onPress: (id: number) => void;
}) {
  return (
    <TouchableOpacity
      style={{ width: cardWidth, margin: cardMargin / 2 }}
      className="m-2 bg-white rounded-2xl p-4"
      onPress={() => onPress(item.id)}
    >
      <Text className="text-gray-900 font-bold text-left">{item.name}</Text>
      <Text className="text-gray-600 text-sm mt-1 text-left">
        Voter No: <Text className="font-semibold">{item.voter_id}</Text>
      </Text>
      <Text className="text-gray-600 text-sm mt-1 text-left">
        Mobile: <Text className="font-semibold">{item.mobile || "-"}</Text>
      </Text>
      <Text className="text-gray-600 text-sm mt-1 text-left">
        Serial: <Text className="font-semibold">{item.serial}</Text>
      </Text>
      <Text className="text-gray-600 text-sm mt-1 text-left">
        Email: <Text className="font-semibold">{item.email || "-"}</Text>
      </Text>
    </TouchableOpacity>
  );
});

export default function VoterListScreen() {
  const router = useRouter();
  const { voters } = useVoters(); // ✅ context
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRefresh = useCallback(async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setLoading(false);
  }, []);

  const filteredVoters = useMemo(() => {
    if (!search) return voters;
    const searchLower = search.toLowerCase();
    return voters.filter(
      (v) =>
        v.name?.toLowerCase().includes(searchLower) ||
        v.email?.toLowerCase().includes(searchLower) ||
        v.voter_id?.toLowerCase().includes(searchLower) ||
        v.serial?.includes(search)
    );
  }, [voters, search]);

  const stats = useMemo(() => {
    const totalVoters = voters.length;
    const updatedVoters = voters.filter((v) => v.updated).length;
    const unupdatedVoters = totalVoters - updatedVoters;
    return { totalVoters, updatedVoters, unupdatedVoters };
  }, [voters]);

  const handleVoterPress = (id: number) => {
    router.push({ pathname: "/editVoter", params: { id } });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="flex-row justify-between items-center bg- p-4 -md">
      <TouchableOpacity onPress={() => router.back()} className="p-2">
    <MaterialIcons name="arrow-back" size={24} color="#111827" />
  </TouchableOpacity>

        <Text className="text-lg font-bold text-gray-900 ml-2">Voter List</Text>
        {/* <TouchableOpacity onPress={handleRefresh} className="p-2 bg-blue-500 rounded-full">
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Ionicons name="refresh" size={20} color="#fff" />
          )}
        </TouchableOpacity> */}
      </View>

      {/* Search */}
      <View className="mt-5 px-4">
        <TextInput
          className="h-12 px-3 rounded-md bg-white text-gray-800"
          placeholder="Search by name, email, voter ID or S. number"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* List */}
      <FlatList
        data={filteredVoters}
        renderItem={({ item }) => <VoterCard item={item} onPress={handleVoterPress} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        contentContainerStyle={{ padding: 8, paddingBottom: 100 }}
      />

      {/* Bottom Stats */}
      {voters.length > 0 && (
        <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex-row justify-around items-center p-3">
          <View className="items-center">
            <Text className="text-gray-700 font-semibold">Total</Text>
            <Text className="text-blue-600 font-bold">{stats.totalVoters}</Text>
          </View>
          <View className="items-center">
            <Text className="text-gray-700 font-semibold">Updated</Text>
            <Text className="text-green-600 font-bold">{stats.updatedVoters}</Text>
          </View>
          <View className="items-center">
            <Text className="text-gray-700 font-semibold">Pending</Text>
            <Text className="text-red-600 font-bold">{stats.unupdatedVoters}</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
