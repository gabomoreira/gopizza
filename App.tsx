import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {
  useFonts, DMSans_400Regular,
} from '@expo-google-fonts/dm-sans'
import {
  DMSerifDisplay_400Regular,
} from '@expo-google-fonts/dm-serif-display'

export default function App() {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSerifDisplay_400Regular
  })

  if(!fontsLoaded) return null

  return (
    <View>
  
    </View>
  );
}
