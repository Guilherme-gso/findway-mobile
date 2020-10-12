import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, View } from 'react-native';
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import Provider from './src/hooks';

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) return <View />;
  return (
    <NavigationContainer>
      <Provider>
        <StatusBar barStyle="light-content" backgroundColor="#20232a" />
        <Routes />
      </Provider>
    </NavigationContainer>
  );
};

export default App;
