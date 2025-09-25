import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab, // custom haptic feedback tab
        tabBarActiveTintColor: Colors[colorScheme].tint, // dynamic tint based on theme
        tabBarInactiveTintColor: Colors[colorScheme].tabIconDefault, // optional inactive color
        tabBarStyle: {
          backgroundColor: Colors[colorScheme].background, // dynamic background
          borderTopWidth: 0, // remove top border if desired
          height: 60, // optional custom height
        },
      }}
    >
      {/* Dashboard Tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <IconSymbol name="house.fill" color={color} size={size || 28} />
          ),
        }}
      />

      {/* Explore Tab */}
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, size }) => (
            <IconSymbol name="paperplane.fill" color={color} size={size || 28} />
          ),
        }}
      />
    </Tabs>
  );
}
