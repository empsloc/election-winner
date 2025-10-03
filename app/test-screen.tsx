// app/test-db.tsx
import { useVoters } from "@/context/VoterContext"; // 👈 just consume context
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TestDBScreen() {
  const { voters, loading } = useVoters();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text className="font-bold text-xl text-gray-900 mb-4">
          Voter List (from Context)
        </Text>

        {loading ? (
          <Text className="text-gray-500">Loading voters...</Text>
        ) : voters.length === 0 ? (
          <Text className="text-gray-500">No voters found.</Text>
        ) : (
          voters.map((v) => (
            <Text key={v.id} className="text-gray-700 mb-2">
              {`${v.id} - ${v.name} - ${v.email ?? ""} - ${v.serial} - ${
                v.voter_id
              } - ${v.mobile ?? ""} - updated:${v.updated} - voted:${
                v.voted
              } - ${v.party ?? ""}`}
            </Text>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
