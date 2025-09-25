import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    if (mobile.length !== 10) {
      Alert.alert("Error", "Please enter a valid 10-digit mobile number");
      return;
    }
    router.replace("/(tabs)");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 justify-center items-center bg-gray-100 px-4"
    >
      <View className="w-full max-w-md flex flex-col gap-0">
        {/* Header */}
        <View className="text-center mb-6 flex flex-col items-center">
          <Text className="text-3xl font-bold text-gray-900">
            Party Worker Login
          </Text>
          <Text className="text-gray-600 mt-2">
            Access your assigned tasks and center
           
          </Text>
        </View>

        {/* Mobile Field */}
        {/* Mobile Field */}
        {/* Mobile Field */}
        <View style={{ position: "relative", marginBottom: 16 }}>
        <MaterialIcons
        className="z-10"
              name="phone-iphone"
              size={24}
              color="#9CA3AF"
              style={{ position: "absolute", left: 12, top: 12 }}
            />
          <TextInput
            keyboardType="number-pad"
            placeholder="Mobile Number"
            placeholderTextColor="#9CA3AF"
            value={mobile}
            onChangeText={setMobile}
            style={{
              borderWidth: 1,
              borderColor: "#D1D5DB",
              borderRadius: 8,
              paddingLeft: 44,
              paddingVertical: 12,
              backgroundColor: "#FFFFFF",
              color: "#111827",
              fontSize: 16,
            }}
          />
        </View>

        {/* Password Field */}
        <View className="mb-6">
        <MaterialIcons
        className="z-10"
              name="lock"
              size={24}
              color="#9CA3AF"
              style={{ position: "absolute", left: 12, top: 12 }}
            />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={{
              borderWidth: 1,
              borderColor: "#D1D5DB",
              borderRadius: 8,
              paddingLeft: 44,
              paddingVertical: 12,
              backgroundColor: "#FFFFFF",
              color: "#111827",
              fontSize: 16,
            }}
          />
        </View>

        {/* OTP & Forgot Password */}
        <View className="flex-row justify-between items-center mb-4">
          <TouchableOpacity
            onPress={() => setOtp(!otp)}
            className="flex-row items-center"
          >
            <View
              className={`w-4 h-4 rounded border border-gray-300 mr-2 ${
                otp ? "bg-blue-600" : "bg-white"
              }`}
            />
            <Text className="text-gray-600 text-sm">Verify with OTP</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text className="text-blue-600 font-medium text-sm">
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          onPress={handleLogin}
          className="w-full bg-blue-600 py-3 rounded-lg mb-4"
        >
          <Text className="text-white font-bold text-center text-lg">
            Login
          </Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text className="text-center text-sm text-gray-500">
          Dont have an account?{" "}
          <Text className="text-blue-600 font-medium">Contact Admin</Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}
