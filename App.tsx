import { NativeBaseProvider } from 'native-base';

import { Text, View, StatusBar } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Loading } from '@components/Loading';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  });


  return (
    <NativeBaseProvider>

      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />

      <Loading />

    </NativeBaseProvider>


  );
}

