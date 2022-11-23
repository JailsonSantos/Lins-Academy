import { useState } from 'react';
import { UserPhoto } from '@components/UserPhoto'
import { ScreenHeader } from '@components/ScreenHeader'
import { Center, ScrollView, Text, VStack, Skeleton, Heading } from 'native-base'
import { TouchableOpacity } from 'react-native';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import * as ImagePiker from 'expo-image-picker'

const PHOTO_SIZE = 33;

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);

  async function handleUserPhotoSelect() {
    await ImagePiker.launchImageLibraryAsync();
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
        <Center mt={4} px={10}>
          {
            photoIsLoading ?
              <Skeleton
                w={PHOTO_SIZE}
                h={PHOTO_SIZE}
                rounded="full"
                endColor="gray.400"
                startColor="gray.500"
              />
              :
              <UserPhoto
                size={PHOTO_SIZE}
                alt="Imagem do Usuario"
                source={{ uri: 'https://github.com/jailsonsantos.png' }}
              />
          }
          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text color="green.500" fontWeight="bold" fontSize="md" mt={2} mb={6}>
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input
            bg="gray.600"
            placeholder="Nome"
          />
          <Input
            isDisabled
            bg="gray.600"
            placeholder="E-mail"
          />
        </Center>
        <VStack px={10} mt={6} mb={9}>
          <Heading color="gray.200" fontSize="md" mb={2}>
            Aterar senha
          </Heading>

          <Input
            bg="gray.600"
            placeholder="Senha antiga"
            secureTextEntry
          />

          <Input
            bg="gray.600"
            placeholder="Nova senha"
            secureTextEntry
          />

          <Input
            bg="gray.600"
            placeholder="Criar a nova senha"
            secureTextEntry
          />

          <Button
            title="Atualizar"
            mt={4}
          />
        </VStack>
      </ScrollView>
    </VStack>
  )
}