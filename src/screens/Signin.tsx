import {
  Text,
  Image,
  Center,
  VStack,
  Heading,
  ScrollView
} from 'native-base'

import LogoSvg from '@assets/logo.svg'
import { Platform } from 'react-native'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import BackgroundImg from '@assets/background.png'
import { useNavigation } from '@react-navigation/native'

import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

export function SignIn() {

  const navitation = useNavigation<AuthNavigatorRoutesProps>();

  function handleNewAccount() {
    navitation.navigate('signUp');
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <VStack
        px={10}
        flex={1}
        pb={Platform.OS === 'ios' ? 40 : 16}
      >
        <Image
          position="absolute"
          resizeMode="contain"
          source={BackgroundImg}
          alt="Pessoas treinando"
        />
        <Center my={24}>
          <LogoSvg />
          <Text
            fontSize="sm"
            color="gray.100"
          >
            Treine sua mente e o seu corpo
          </Text>
        </Center>

        <Center>
          <Heading
            mb={6}
            fontSize="xl"
            color="gray.100"
            fontFamily="heading"
          >
            Acesse sua conta
          </Heading>
          <Input
            placeholder="E-mail"
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <Input
            secureTextEntry
            placeholder="Senha"
          />
          <Button title="Acessar" />
        </Center>

        <Center mt={24}>
          <Text
            mb={3}
            fontSize="sm"
            color="gray.100"
            fontFamily="body"
          >
            Ainda não tem acesso?
          </Text>
          <Button
            variant="outline"
            title="Criar conta"
            onPress={handleNewAccount}
          />
        </Center>
      </VStack>
    </ScrollView>
  )
}