import {
  Text,
  Image,
  Center,
  VStack,
  Heading,
  ScrollView,
  useToast
} from 'native-base'

import LogoSvg from '@assets/logo.svg'
import { Platform } from 'react-native'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import BackgroundImg from '@assets/background.png'
import { useNavigation } from '@react-navigation/native'

import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { useAuth } from '@hooks/useAuth'
import { AppError } from '@utils/AppError'
import { useState } from 'react'


type FormDataProps = {
  email: string;
  password: string;
}
// Schema de validação do YUP
const signUpSchema = yup.object({
  email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
  password: yup.string().required('Informe a senha.').min(6, 'A senha deve ter pelo menos 6 caracteres.'),
});

export function SignIn() {

  const { signIn } = useAuth()
  const navitation = useNavigation<AuthNavigatorRoutesProps>();

  // Validando o Schema do form com YupResolver
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema)
  });

  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  function handleNewAccount() {
    navitation.navigate('signUp');
  }

  async function handleLogin({ email, password }: FormDataProps) {

    try {
      setIsLoading(true)
      await signIn(email, password);

    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : 'Não foi possível entrar. Tente novamente mais tarde.'

      setIsLoading(false)

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      });
    }
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
          defaultSource={BackgroundImg}
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

          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                placeholder="E-mail"
                autoCapitalize="none"
                onChangeText={onChange}
                keyboardType="email-address"
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                secureTextEntry
                placeholder="Senha"
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Button
            title="Acessar"
            isLoading={isLoading}
            onPress={handleSubmit(handleLogin)} />
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