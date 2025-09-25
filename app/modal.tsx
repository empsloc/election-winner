import { Link } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ModalScreen() {
  return (
    <ThemedView >
      <ThemedText className='text-green-800'>This is a modal asd</ThemedText>
      <Link href="/" dismissTo >
        <ThemedText  >Go to home screen</ThemedText>
      </Link>
    </ThemedView>
  );
}


