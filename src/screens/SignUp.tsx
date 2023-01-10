import {
  Text,
  Image,
  Center,
  VStack,
  Heading,
  ScrollView,
  useToast,
} from 'native-base'

import LogoSvg from '@assets/logo.svg'
import { Alert, Platform } from 'react-native'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import BackgroundImg from '@assets/background.png'
import { useNavigation } from '@react-navigation/native'

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { api } from '@services/api'
import axios from 'axios'
import { AppError } from '@utils/AppError'
import { useState } from 'react'
import { useAuth } from '@hooks/useAuth'

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
}

// Schema de validação do YUP
const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
  password: yup.string().required('Informe a senha.').min(6, 'A senha deve ter pelo menos 6 caracteres.'),
  password_confirm: yup.string().required('Confirme a senha.').oneOf([yup.ref('password'), null], 'A confirmação da senha não confere.')
});

export function SignUp() {

  const navigation = useNavigation();
  const toast = useToast();
  const { signIn } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  // Validando o Schema do form com YupResolver
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema)
  });

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleSignUp({ name, email, password }: FormDataProps) {
    try {
      setIsLoading(true);

      await api.post("/users", {
        name, email, password
      });

      await signIn(email, password);

    } catch (error) {
      setIsLoading(false);
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível criar a conta. Tente mais tarde.'

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
            Crie sua conta
          </Heading>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                placeholder="Nome"
                onChangeText={onChange}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
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
            control={control}
            name="password"
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

          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                secureTextEntry
                onChangeText={onChange}
                placeholder="Confirme a senha"
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
                errorMessage={errors.password_confirm?.message}

              />
            )}
          />

          <Button
            mt={4}
            title="Criar e acessar"
            onPress={handleSubmit(handleSignUp)}
            isLoading={isLoading}
          />
        </Center>

        <Button
          mt={12}
          variant="outline"
          title="Voltar para o login"
          onPress={handleGoBack}
        />

      </VStack>
    </ScrollView>
  )
}