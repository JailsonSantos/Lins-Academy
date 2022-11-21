import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base'

import LogoSvg from '@assets/logo.svg'
import BackgroundImg from '@assets/background.png'
import { Input } from '@components/Input'
import { Button } from '@components/Button'

export function SignIn() {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >

      <VStack
        px={10}
        flex={1}
        bg="gray.700"
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
          />
        </Center>
      </VStack>
    </ScrollView>
  )
}