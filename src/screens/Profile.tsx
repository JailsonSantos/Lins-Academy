import { useState } from 'react';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import * as FileSystem from 'expo-file-system';
import * as ImagePiker from 'expo-image-picker';
import { UserPhoto } from '@components/UserPhoto'
import { Controller, useForm } from 'react-hook-form';
import { Alert, TouchableOpacity } from 'react-native';
import { ScreenHeader } from '@components/ScreenHeader';
import { Center, ScrollView, Text, VStack, Skeleton, Heading, useToast } from 'native-base';
import { useAuth } from '@hooks/useAuth';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { api } from '@services/api';
import { AppError } from '@utils/AppError';
import defaultUserPhotoImg from '@assets/userPhotoDefault.png';


const PHOTO_SIZE = 33;

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  old_password: string;
  confirm_password: string;
}

const profileSchema = yup.object({
  name: yup
    .string()
    .required('Informe o nome.'),
  password: yup
    .string()
    .min(6, 'A senha deve ter pelo menos 6 dígitos.')
    .nullable()
    .transform((value) => !!value ? value : null),
  confirm_password: yup
    .string()
    .nullable()
    .transform((value) => !!value ? value : null)
    .oneOf([yup.ref('password'), null], 'A confirmação de senha não confere.')
    .when('password', {
      is: (Field: any) => Field,
      then: yup
        .string()
        .nullable()
        .required('Informe a confirmação de senha')
        .transform((value) => !!value ? value : null)
    })
})

export function Profile() {

  const [isUpdating, setIsUpdating] = useState(false)
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState('https://github.com/jailsonsantos.png');

  const toast = useToast();
  const { user, updateUserProfile } = useAuth();

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
    resolver: yupResolver(profileSchema)
  });

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true);

    try {
      const photoSelected = await ImagePiker.launchImageLibraryAsync({
        mediaTypes: ImagePiker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true
      });

      if (photoSelected.canceled) {
        return;
      }

      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri);

        if (photoInfo.size && (photoInfo.size / 1024 / 1024) > 5) {

          return toast.show({
            title: 'Essa imagem é muito grande. Escolha uma de até 5MB.',
            placement: 'top',
            bgColor: 'red.500',
          })
        }

        const fileExtension = photoSelected.assets[0].uri?.split('.').pop();

        const photoFile = {
          name: `${user.name}.${fileExtension}`.toLowerCase(),
          uri: photoSelected.assets[0].uri,
          type: `${photoSelected.assets[0].type}/${fileExtension}`
        } as any;

        const userPhotoUploadForm = new FormData();
        userPhotoUploadForm.append('avatar', photoFile);

        const avatarUpdatedResponse = await api.patch('users/avatar', userPhotoUploadForm, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        const userUpdated = user;
        userUpdated.avatar = avatarUpdatedResponse.data.avatar;

        updateUserProfile(userUpdated);

        return toast.show({
          title: 'Foto atualizada',
          placement: 'top',
          bgColor: 'green.500',
        })
      }

    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false)
    }
  }

  async function handleProfileUpdate(data: FormDataProps) {
    try {
      setIsUpdating(true);

      const userUpdated = user;
      userUpdated.name = data.name;

      await api.put('/users', data);

      await updateUserProfile(userUpdated);

      toast.show({
        title: 'Perfil atualizado com sucesso!',
        placement: 'top',
        bgColor: 'green.500'
      })

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível atualizar os dados. Tente mais tarde.';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsUpdating(false);
    }
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
                source={
                  user.avatar
                    ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
                    : defaultUserPhotoImg
                }
              />
          }
          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text color="green.500" fontWeight="bold" fontSize="md" mt={2} mb={6}>
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Controller
            name="name"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                bg="gray.600"
                value={value}
                placeholder="Nome"
                onChangeText={onChange}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                isDisabled
                bg="gray.600"
                value={value}
                placeholder="E-mail"
                onChangeText={onChange}
              />
            )}
          />

        </Center>
        <VStack px={10} mt={6} mb={9}>
          <Heading color="gray.200" fontSize="md" fontFamily="heading" mb={2}>
            Aterar senha
          </Heading>

          <Controller
            name="old_password"
            control={control}
            render={({ field: { onChange } }) => (
              <Input
                bg="gray.600"
                secureTextEntry
                onChangeText={onChange}
                placeholder="Senha antiga"
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field: { onChange } }) => (

              <Input
                bg="gray.600"
                secureTextEntry
                onChangeText={onChange}
                placeholder="Nova senha"
                errorMessage={errors.password?.message}
              />
            )}
          />


          <Controller
            name="confirm_password"
            control={control}
            render={({ field: { onChange } }) => (
              <Input
                bg="gray.600"
                secureTextEntry
                onChangeText={onChange}
                placeholder="Confirme a nova senha"
                errorMessage={errors.confirm_password?.message}

              />
            )}
          />


          <Button
            mt={4}
            title="Atualizar"
            isLoading={isUpdating}
            onPress={handleSubmit(handleProfileUpdate)}
          />
        </VStack>
      </ScrollView>
    </VStack>
  )
}