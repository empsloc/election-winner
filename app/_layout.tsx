import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import 'react-native-reanimated';
import "../global.css"; // for Expo Router (_layout.tsx)


import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};


export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
   
    
    <ThemeProvider value={ DarkTheme }>

      <Stack screenOptions={{ headerShown: false}}>
      {/* Login screen */}
      <Stack.Screen name="index" />
      
      {/* Modal */}
      <Stack.Screen name="modal" />

      {/* Tabs */}
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="voter-list" />
      <Stack.Screen name="editVoter"  />
      <Stack.Screen name="votes-screen" />
      <Stack.Screen name="promotional-material" />
      <Stack.Screen name="phone-diary" />
      <Stack.Screen name="chat-screen" />
      <Stack.Screen name="send-email-screen" />
      <Stack.Screen name="booth-system-screen" />
      <Stack.Screen name="war-room-screen" />
      <Stack.Screen name="votes-stats-screen" />


      




    </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
    
    
  );
}
