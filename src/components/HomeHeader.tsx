import { api } from '@services/api';
import { UserPhoto } from './UserPhoto';
import { useAuth } from '@hooks/useAuth';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import defaultUserPhotoImg from '@assets/userPhotoDefault.png';
import { Heading, HStack, VStack, Text, Icon } from 'native-base';

export function HomeHeader() {

  const { user, signOut } = useAuth();

  return (
    <HStack bg="gray.600" pt={8} pb={5} px={8} alignItems="center">
      <UserPhoto
        mr={4}
        size={16}
        alt="Imagem do usuário"
        source={
          user.avatar
            ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
            : defaultUserPhotoImg
        }
      />
      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>
        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          {user.name}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={signOut}>
        <Icon
          size={7}
          name="logout"
          color="gray.200"
          as={MaterialIcons}
        />
      </TouchableOpacity>
    </HStack>
  )
}