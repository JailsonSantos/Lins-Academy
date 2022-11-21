import { NativeBaseProvider } from 'native-base';

import { Text, View, StatusBar } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Loading } from '@components/Loading';
import { THEME } from './src/theme';
import { SignIn } from '@screens/Signin';
import { SignUp } from '@screens/SignUp';
import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  });


  return (
    <NativeBaseProvider theme={THEME}>

      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />

      {fontsLoaded ? <Routes /> :
        <Loading />
      }

    </NativeBaseProvider>


  );
}

