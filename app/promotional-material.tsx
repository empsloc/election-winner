import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const screenWidth = Dimensions.get("window").width;
const cardMargin = 12;
const cardWidth = screenWidth - cardMargin * 2;

const promoItems = [
  {
    id: "1",
    name: "Banner",
    request: "Approved",
    quantity: 50,
    condition: "New",
    sponsorship: "Yes",
    center: "Center A",
  },
  {
    id: "2",
    name: "Flyers",
    request: "Pending",
    quantity: 200,
    condition: "New",
    sponsorship: "No",
    center: "Center B",
  },
  {
    id: "3",
    name: "T-Shirts",
    request: "Approved",
    quantity: 100,
    condition: "Good",
    sponsorship: "Yes",
    center: "Center A",
  },
];

export default function PromotionalMaterialScreen() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmitRequest = () => {
    console.log("Requested Item:", selectedItem, "Quantity:", quantity);
    setSelectedItem("");
    setQuantity("");
    setModalVisible(false);
  };

  const renderPromoCard = ({ item }: any) => (
    <View
      style={{
        width: cardWidth,
        margin: cardMargin,
        backgroundColor: "white",
        borderRadius: 20,
        paddingVertical: 12,
      }}
    >
      {/* Card Header */}
      <Text className="font-bold text-gray-900 text-lg mb-3 px-5">
        Item Details
      </Text>

      {/* Details with full-width dividers */}
      <View>
        {[
          { label: "Item Name", value: item.name },
          { label: "Request Status", value: item.request },
          { label: "Quantity", value: item.quantity },
          { label: "Condition", value: item.condition },
          { label: "Sponsorship", value: item.sponsorship },
          { label: "Center", value: item.center },
        ].map((attr, index, arr) => (
          <View key={index}>
            <View className="flex-row justify-between py-3 px-5">
              <Text className="text-gray-700">{attr.label}</Text>

              {attr.label === "Request Status" ? (
                <View
                  className={`px-3 py-1 rounded-full ${
                    item.request === "Approved"
                      ? "bg-green-50"
                      : item.request === "Pending"
                      ? "bg-yellow-50"
                      : "bg-red-50"
                  }`}
                >
                  <Text
                    className={`text-sm font-semibold ${
                      item.request === "Approved"
                        ? "text-green-700"
                        : item.request === "Pending"
                        ? "text-yellow-700"
                        : "text-red-700"
                    }`}
                  >
                    {attr.value}
                  </Text>
                </View>
              ) : (
                <Text className="font-semibold text-gray-900">
                  {attr.value}
                </Text>
              )}
            </View>

            {index !== arr.length - 1 && (
              <View
                style={{
                  height: 1,
                  backgroundColor: "#E5E7EB",
                  width: "100%",
                }}
              />
            )}
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="flex-row justify-center items-center bg-white p-4">
        <Text className="text-lg font-bold text-gray-900">
          Promotional Material
        </Text>
      </View>

      <FlatList
        data={promoItems}
        renderItem={renderPromoCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      {/* Floating Button */}
      <TouchableOpacity
        className="absolute bottom-6 self-center bg-blue-600 rounded-full px-6 py-4 shadow-lg"
        onPress={() => setModalVisible(true)}
      >
        <Text className="text-white font-semibold">+ Request New Item</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg--100 bg-opacity-40">
          <View className="bg-white w-11/12 rounded-2xl p-6 shadow-lg">
            <Text className="text-xl font-bold text-gray-900 mb-4">
              Request New Item
            </Text>

            {/* Item Name Dropdown */}
            <Text className="text-gray-700 mb-1">Item Name</Text>
            <View className="bg-gray-100 rounded-xl mb-4">
              <Picker selectedValue={selectedItem} onValueChange={setSelectedItem}>
                <Picker.Item label="Select Item" value="" />
                <Picker.Item label="Banner" value="Banner" />
                <Picker.Item label="Flyers" value="Flyers" />
                <Picker.Item label="T-Shirts" value="T-Shirts" />
                <Picker.Item label="Caps" value="Caps" />
              </Picker>
            </View>

            {/* Quantity Input */}
            <Text className="text-gray-700 mb-1">Quantity Requested</Text>
            <TextInput
              className="bg-gray-100 rounded-xl px-4 py-3 mb-4"
              placeholder="Enter quantity"
              keyboardType="numeric"
              value={quantity}
              onChangeText={setQuantity}
            />

            {/* Submit Button */}
            <TouchableOpacity
              className="bg-blue-600 rounded-xl py-3 mb-2"
              onPress={handleSubmitRequest}
            >
              <Text className="text-white font-semibold text-center">
                Submit Request
              </Text>
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity
              className="bg-gray-300 rounded-xl py-3"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-gray-700 font-semibold text-center">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
