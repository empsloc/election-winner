import { useUsers } from "@/context/UserContext";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(false);
  const [error, setError] = useState(""); // ✅ Error message
  const router = useRouter();

  const { users } = useUsers(); // Get users from context

  const handleLogin = () => {
    setError(""); // Reset error on each attempt

    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    // Check credentials
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      // Login success
      router.replace("/(tabs)");
    } else {
      // Invalid credentials
      setError("Invalid username or password");
    }
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

        {/* Username Field */}
        <View style={{ position: "relative", marginBottom: 16 }}>
          <MaterialIcons
            className="z-10"
            name="person"
            size={24}
            color="#9CA3AF"
            style={{ position: "absolute", left: 12, top: 12 }}
          />
          <TextInput
            placeholder="Username"
            placeholderTextColor="#9CA3AF"
            value={username}
            onChangeText={setUsername}
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
        <View className="mb-2" style={{ position: "relative" }}>
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

        {/* Error Message */}
        {error ? (
          <Text className="text-red-600 text-sm mb-4">{error}</Text>
        ) : null}

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
          {"Don't have an account? "}
          <Text className="text-blue-600 font-medium">Contact Admin</Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}
