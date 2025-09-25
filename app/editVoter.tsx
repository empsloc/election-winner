import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ScrollView,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditVoterScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const voter = {
    id: params.id,
    name: params.name as string,
    voterNumber: params.voterNumber as string,
    mobile: params.mobile as string,
    email: params.email as string,
  };

  const [mobile, setMobile] = useState(voter.mobile);
  const [email, setEmail] = useState(voter.email);
  const [business, setBusiness] = useState("");
  const [caste, setCaste] = useState("");
  const [party, setParty] = useState("");
  const [vip, setVip] = useState(false);
  const [dead, setDead] = useState(false);
  const [migrated, setMigrated] = useState(false);

  const [migAddress, setMigAddress] = useState("");
  const [migContact, setMigContact] = useState("");
  const [migEmail, setMigEmail] = useState("");
  const [migDistrict, setMigDistrict] = useState("");
  const [migComment, setMigComment] = useState("");
  const [migResponsible, setMigResponsible] = useState("");
  const [migRespNumber, setMigRespNumber] = useState("");

  const InputField = ({
    label,
    value,
    onChangeText,
    placeholder,
  }: {
    label: string;
    value: string;
    onChangeText: (val: string) => void;
    placeholder?: string;
  }) => (
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

  const DropdownField = ({
    label,
    selectedValue,
    onValueChange,
    items,
  }: {
    label: string;
    selectedValue: string;
    onValueChange: (val: string) => void;
    items: string[];
  }) => (
    <View className="mb-4">
      <Text className="text-sm font-semibold text-gray-700 mb-1">{label}</Text>
      <View className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={{ height: 50 }}
        >
          <Picker.Item label={`Select ${label}`} value="" />
          {items.map((item, idx) => (
            <Picker.Item key={idx} label={item} value={item} />
          ))}
        </Picker>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Info */}
        <View className="bg-white p-4 rounded-2xl shadow-md mb-6">
          <Text className="text-xl font-bold text-gray-900">{voter.name}</Text>
          <Text className="text-gray-500 mt-1">
            Voter No: {voter.voterNumber}
          </Text>
          <Text className="text-gray-500">Center: (Fixed Center Info)</Text>
        </View>

        {/* Editable Fields */}
        <InputField label="Mobile" value={mobile} onChangeText={setMobile} />
        <InputField label="Email" value={email} onChangeText={setEmail} />

        {/* Dropdowns */}
        <DropdownField
          label="Business"
          selectedValue={business}
          onValueChange={setBusiness}
          items={["Shopkeeper", "Farmer", "Teacher", "Engineer", "Other"]}
        />
        <DropdownField
          label="Caste"
          selectedValue={caste}
          onValueChange={setCaste}
          items={["General", "OBC", "SC", "ST", "Other"]}
        />
        <DropdownField
        
          label="Party"
          selectedValue={party}
          onValueChange={setParty}
          items={["BJP", "Congress", "NCP", "Shiv Sena", "Other"]}
        />

        {/* Toggles */}
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

        {/* Migrated Fields */}
        {migrated && (
          <View className="mt-6 bg-white p-4 rounded-2xl shadow-md">
            <Text className="text-lg font-semibold text-gray-800 mb-4">
              Migration Details
            </Text>
            <InputField
              label="Address"
              value={migAddress}
              onChangeText={setMigAddress}
            />
            <InputField
              label="Contact"
              value={migContact}
              onChangeText={setMigContact}
            />
            <InputField
              label="Email"
              value={migEmail}
              onChangeText={setMigEmail}
            />
            <InputField
              label="District"
              value={migDistrict}
              onChangeText={setMigDistrict}
            />
            <InputField
              label="Comment"
              value={migComment}
              onChangeText={setMigComment}
            />
            <InputField
              label="Responsible Person"
              value={migResponsible}
              onChangeText={setMigResponsible}
            />
            <InputField
              label="Responsible Person’s Number"
              value={migRespNumber}
              onChangeText={setMigRespNumber}
            />
          </View>
        )}
      </ScrollView>

      {/* Floating Save Button */}
      <View className="absolute bottom-5 left-5 right-5">
        <TouchableOpacity
          className="bg-blue-600 rounded-full py-4 shadow-lg"
          onPress={() => router.back()}
        >
          <Text className="text-center text-white font-bold text-lg">
            Save Changes
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
