import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Linking,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('window').width;
const cardMargin = 12;
const cardWidth = screenWidth - cardMargin * 2;

const contacts = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Street, City',
    position: 'Manager',
    phone: '+911234567890',
    whatsapp: '+911234567890',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    address: '456 Avenue, City',
    position: 'Developer',
    phone: '+911098765432',
    whatsapp: '+911098765432',
  },
  {
    id: '3',
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    address: '789 Road, City',
    position: 'Designer',
    phone: '+911112223334',
    whatsapp: '+911112223334',
  },
];

export default function PhoneDiaryScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContactCard = ({ item }: any) => (
    <View
      className="bg-white rounded-2xl p-4 flex-row justify-between items-center mx-3 my-3  "
      style={{
        width: cardWidth,
     
       
      }}
    >
      {/* Left Side: Contact Info */}
      <View className="flex-1">
        <Text className="text-gray-900 font-bold text-lg">{item.name}</Text>
        <Text className="text-gray-500 text-sm mt-1">{item.email}</Text>
        <Text className="text-gray-500 text-sm">{item.address}</Text>
        <Text className="text-blue-500 font-bold mt-1">{item.position}</Text>
      </View>

      {/* Right Side: Action Icons */}
      <View className="flex-row items-center gap-2">
        <TouchableOpacity
          className="bg-blue-100 p-3 rounded-full"
          onPress={() => Linking.openURL(`tel:${item.phone}`)}
        >
          <Feather name="phone-call" size={20} color="#1E40AF" />
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-blue-100 p-3 rounded-full"
          onPress={() => Linking.openURL(`mailto:${item.email}`)}
        >
          <MaterialIcons name="email" size={20} color="#1E40AF" />
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-blue-100 p-3 rounded-full"
          onPress={() =>
            Linking.openURL(`https://wa.me/${item.whatsapp.replace(/\D/g, '')}`)
          }
        >
          <FontAwesome name="whatsapp" size={20} color="#1E40AF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="flex-row justify-between items-center bg- p-4 ">
        <Text className="text-lg font-bold text-gray-900 w-full ">Phone Diary</Text>
      </View>

      {/* Search Bar */}
      <View className="p-3 bg- ">
        <TextInput
          placeholder="Search by name"
          className="bg-white px-4 py-3 rounded-2xl text-base"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Contact List */}
      <FlatList
        data={filteredContacts}
        renderItem={renderContactCard}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </SafeAreaView>
  );
}
