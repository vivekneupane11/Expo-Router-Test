import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useAuth } from '@/hooks/useAuth';
import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const {isAuth,setIsAuth} = useAuth()
  
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  useEffect(() => {
    const checkAuthentication = async () => {
      const isAuthenticated = await AsyncStorage.getItem('isAuthenticated');
      setIsAuth(isAuthenticated === 'true');
    };
    checkAuthentication();
  }, [setIsAuth]);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }



  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
      <Stack.Protected guard={!isAuth}>
        <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={isAuth}>
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
