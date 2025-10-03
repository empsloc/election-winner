import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';
import { useUsers } from '@/context/UserContext';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const { users } = useUsers();

  // Assuming the first active user is the logged-in user
  const currentUser = users.find(u => u.isActive) || {
    name: 'John Doe',
    email: 'johndoe@example.com',
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Header */}
      <ThemedView className="bg-blue-600 p-6 rounded-b-3xl">
        <ThemedText
          type="title"
          className="text-white text-2xl font-bold mb-1"
          style={{ fontFamily: Fonts.rounded }}
        >
          {currentUser.name}
        </ThemedText>
        <ThemedText type="default" className="text-white opacity-80">
          {currentUser.email}
        </ThemedText>
      </ThemedView>

      <ScrollView className="mt-6 px-4">
        {/* Quick Actions Card */}
        <ThemedView className="bg-white rounded-xl p-4  mb-6 flex-row justify-between">
          <TouchableOpacity className="items-center">
            <MaterialIcons name="account-balance-wallet" size={28} color="#1E40AF" />
            <ThemedText type="default" className="mt-1 font-bold text-sm">
              Wallet
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity className="items-center">
            <Feather name="credit-card" size={28} color="#1E40AF" />
            <ThemedText type="default" className="mt-1 font-bold text-sm">
              Cards
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity className="items-center">
            <MaterialIcons name="history" size={28} color="#1E40AF" />
            <ThemedText type="default" className="mt-1 font-bold text-sm">
              History
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity className="items-center">
            <Feather name="settings" size={28} color="#1E40AF" />
            <ThemedText type="default" className="mt-1 font-bold text-sm">
              Settings
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* Account & Security Section */}
        <ThemedView className="bg-white rounded-xl p-4  mb-6">
          <ThemedText type="title" className="text-lg mb-3 font-bold">
            Account & Security
          </ThemedText>
          <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-200">
            <ThemedText type="default">Change Password</ThemedText>
            <Feather name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-200">
            <ThemedText type="default">Two-Factor Authentication</ThemedText>
            <Feather name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center justify-between py-3">
            <ThemedText type="default">Manage Devices</ThemedText>
            <Feather name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </ThemedView>

        {/* App Settings Section */}
        <ThemedView className="bg-white rounded-xl p-4  mb-6">
          <ThemedText type="title" className="text-lg mb-3 font-bold">
            App Settings
          </ThemedText>
          <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-200">
            <ThemedText type="default">Notifications</ThemedText>
            <Feather name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-200">
            <ThemedText type="default">Privacy</ThemedText>
            <Feather name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center justify-between py-3">
            <ThemedText type="default">Language</ThemedText>
            <Feather name="chevron-right" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </ThemedView>

        {/* Logout Button */}
        <TouchableOpacity className="bg-blue-500 py-3 rounded-xl mb-8">
          <ThemedText type="default" className="text-white text-center font-bold">
            Logout
          </ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
