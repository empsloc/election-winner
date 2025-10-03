import { useVoters, Voter } from "@/context/VoterContext";
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// InputField component
export const InputField = ({ label, value, onChangeText, placeholder }: any) => (
  <View className="mb-4">
    <Text className="text-sm font-semibold text-gray-700 mb-1">{label}</Text>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#9CA3AF"
      className="bg-white rounded-xl px-4 py-3 border border-gray-200 shadow-sm"
    />
  </View>
);

// DropdownField component
export const DropdownField = ({ label, selectedValue, onValueChange, items }: any) => (
  <View className="mb-4">
    <Text className="text-sm font-semibold text-gray-700 mb-1">{label}</Text>
    <View className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <Picker selectedValue={selectedValue} onValueChange={onValueChange} style={{ height: 52 }}>
        <Picker.Item label={`Select ${label}`} value="" />
        {items.map((item: string, idx: number) => (
          <Picker.Item key={idx} label={item} value={item} />
        ))}
      </Picker>
    </View>
  </View>
);

export default function EditVoterScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { voters, setVoters } = useVoters();

  const voterId = Number(params.id);
  const voterIndex = voters.findIndex((v) => v.id === voterId);
  const voter = voterIndex !== -1 ? voters[voterIndex] : null;

  const [name, setName] = useState(voter?.name || "");
  const [voterNumber, setVoterNumber] = useState(voter?.voter_id || "");
  const [mobile, setMobile] = useState(voter?.mobile || "");
  const [email, setEmail] = useState(voter?.email || "");
  const [business, setBusiness] = useState(voter?.business || "");
  const [caste, setCaste] = useState(voter?.caste || "");
  const [party, setParty] = useState(voter?.party || "");
  const [vip, setVip] = useState(voter?.VIP || false);
  const [dead, setDead] = useState(voter?.dead || false);
  const [migrated, setMigrated] = useState(voter?.migrated || false);
  const [migAddress, setMigAddress] = useState(voter?.migrate_address || "");
  const [migContact, setMigContact] = useState(voter?.migrate_contact || "");
  const [migEmail, setMigEmail] = useState(voter?.migrate_email || "");
  const [migDistrict, setMigDistrict] = useState(voter?.migrate_district || "");
  const [migComment, setMigComment] = useState(voter?.comment || "");
  const [migResponsible, setMigResponsible] = useState(voter?.migrate_resp_person || "");
  const [migRespNumber, setMigRespNumber] = useState(voter?.migrate_resp_person_number || "");

  const [saving, setSaving] = useState(false);

  const saveChanges = useCallback(() => {
    if (!voter) return;

    // ✅ Check for party selection
    if (!party || party.trim() === "") {
      Alert.alert("Validation Error", "Please select a party before saving.");
      return;
    }

    setSaving(true);

    const updatedVoter: Voter = {
      ...voter,
      name,
      voter_id: voterNumber,
      mobile,
      email,
      business,
      caste,
      party,
      VIP: vip,
      dead,
      migrated,
      migrate_address: migAddress,
      migrate_contact: migContact,
      migrate_email: migEmail,
      migrate_district: migDistrict,
      comment: migComment,
      migrate_resp_person: migResponsible,
      migrate_resp_person_number: migRespNumber,
      updated: 1,
    };

    const updatedVoters = [...voters];
    updatedVoters[voterIndex] = updatedVoter;
    setVoters(updatedVoters);

    setSaving(false);
    router.back();
  }, [
    name, voterNumber, mobile, email, business, caste, party,
    vip, dead, migrated, migAddress, migContact, migEmail, migDistrict,
    migComment, migResponsible, migRespNumber, voter, voterIndex, voters, setVoters, router
  ]);

  if (!voter) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-gray-50">
        <Text className="text-gray-600">No voter data found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }} keyboardShouldPersistTaps="handled">
        <View className="flex-row justify-between items-center bg- p-4">
  {/* Back Button */}
  <TouchableOpacity onPress={() => router.back()} className="p-2">
    <MaterialIcons name="arrow-back" size={24} color="#111827" />
  </TouchableOpacity>

  {/* Title */}
  <Text className="text-lg font-bold text-gray-900 ml-2">Edit Voter</Text>

  {/* Optional refresh placeholder */}
  {/* <View style={{ width: 32 }} />  */}
</View>
          <View className="bg- p-4 rounded-2xl -md mb-6">
       
            <Text className="text-xl font-bold text-gray-900">{name}</Text>
            <Text className="text-gray-500 mt-1">Voter No: {voterNumber}</Text>
          </View>

          <InputField label="Mobile" value={mobile} onChangeText={setMobile} />
          <InputField label="Email" value={email} onChangeText={setEmail} />
          <DropdownField label="Business" selectedValue={business} onValueChange={setBusiness} items={["Shopkeeper","Farmer","Teacher","Engineer","Other"]} />
          <DropdownField label="Caste" selectedValue={caste} onValueChange={setCaste} items={["General","OBC","SC","ST","Other"]} />
          <DropdownField label="Party" selectedValue={party} onValueChange={setParty} items={["BJP","Congress","NCP","Shiv Sena","Other"]} />

          <View className="bg-white p-4 rounded-2xl shadow-md mt-2 space-y-3">
            <View className="flex-row items-center justify-between">
              <Text className="text-gray-700 font-medium">VIP</Text>
              <Switch value={vip} onValueChange={setVip} />
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-gray-700 font-medium">Dead</Text>
              <Switch value={dead} onValueChange={setDead} />
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-gray-700 font-medium">Migrated</Text>
              <Switch value={migrated} onValueChange={setMigrated} />
            </View>
          </View>

          {migrated && (
            <View className="mt-6 bg-white p-4 rounded-2xl shadow-md">
              <Text className="text-lg font-semibold text-gray-800 mb-4">Migration Details</Text>
              <InputField label="Address" value={migAddress} onChangeText={setMigAddress} />
              <InputField label="Contact" value={migContact} onChangeText={setMigContact} />
              <InputField label="Email" value={migEmail} onChangeText={setMigEmail} />
              <InputField label="District" value={migDistrict} onChangeText={setMigDistrict} />
              <InputField label="Comment" value={migComment} onChangeText={setMigComment} />
              <InputField label="Responsible Person" value={migResponsible} onChangeText={setMigResponsible} />
              <InputField label="Responsible Person's Number" value={migRespNumber} onChangeText={setMigRespNumber} />
            </View>
          )}
        </ScrollView>

        <View className="absolute bottom-5 left-5 right-5">
          <TouchableOpacity
            className={`rounded-full py-4 shadow-lg ${saving ? 'bg-gray-400' : 'bg-blue-600'}`}
            onPress={saveChanges}
            disabled={saving}
          >
            <Text className="text-center text-white font-bold text-lg">{saving ? 'Saving...' : 'Save Changes'}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
