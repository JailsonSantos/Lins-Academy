import { Heading, HStack, VStack, Text, Icon } from 'native-base';
import { UserPhoto } from './UserPhoto';
import { MaterialIcons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native';

export function HomeHeader() {
  return (
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <UserPhoto
        mr={4}
        size={16}
        alt="Imagem do usuário"
        source={{ uri: 'https://github.com/jailsonsantos.png' }}
      />
      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>
        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          Jailson
        </Heading>
      </VStack>

      <TouchableOpacity>
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