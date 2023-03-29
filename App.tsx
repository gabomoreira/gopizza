import { DMSans_400Regular, useFonts } from '@expo-google-fonts/dm-sans';
import {
  DMSerifDisplay_400Regular
} from '@expo-google-fonts/dm-serif-display';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';
import { SignIn } from './src/screens/SignIn';
import theme from './src/theme';
import { AuthProvider } from './src/hooks/auth';
import { Product } from './src/screens/Product';
import { Home } from './src/screens/Home';
import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSerifDisplay_400Regular
  })

  if(!fontsLoaded) return null

  return (
    <ThemeProvider theme={theme}>
      <StatusBar backgroundColor='transparent' style='light' translucent />

      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}
