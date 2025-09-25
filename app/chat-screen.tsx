import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const chats = [
  { id: '1', name: 'John Doe', lastMessage: 'Hey! How are you?', time: '2:45 PM' },
  { id: '2', name: 'Jane Smith', lastMessage: 'Let’s catch up tomorrow.', time: '1:30 PM' },
  { id: '3', name: 'Alice Johnson', lastMessage: 'Sure, I’ll send the files.', time: '12:10 PM' },
  { id: '4', name: 'Bob Williams', lastMessage: 'Thanks for your help!', time: 'Yesterday' },
];

export default function ChatScreen() {
  const [recentChats, setRecentChats] = useState(chats);

  const renderChatCard = ({ item }: any) => (
    <TouchableOpacity className="bg- rounded-2xl p-4 flex-row justify-between items-center mx-3 my-2 -md">
      {/* Left side: Avatar and chat info */}
      <View className="flex-row items-center">
        <View className="w-12 h-12 bg-blue-300 rounded-full justify-center items-center">
          <Feather name="message-circle" size={22} color="white" />
        </View>
        <View className="ml-4">
          <Text className="text-gray-900 font-bold text-base">{item.name}</Text>
          <Text className="text-gray-500 text-sm mt-1">{item.lastMessage}</Text>
        </View>
      </View>

      {/* Right side: Time */}
      <Text className="text-gray-400 text-xs">{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="flex-row justify-between items-center bg- p-4 -md">
        <Text className="text-lg font-bold w-full text-center text-gray-900">Chats</Text>
      </View>

      {/* Recent Chats Heading */}
      <Text className="text-gray-700 font-semibold text-base mt-3 ml-4">Recent Chats</Text>

      {/* Chat List */}
      <FlatList
        data={recentChats}
        renderItem={renderChatCard}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Floating New Chat Button */}
      <TouchableOpacity className="absolute bottom-6 right-6 bg-blue-600 w-14 h-14 rounded-full justify-center items-center shadow-lg">
        <Feather name="plus" size={28} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
