import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Heading, HStack, Image, Text, VStack, Icon } from "native-base";
import { Entypo } from '@expo/vector-icons';

type Props = TouchableOpacityProps & {

}

export function ExerciseCard({ ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack bg="gray.500" alignItems="center" p={2} pr={4} mb={3} rounded="md" >
        <Image
          w={16}
          h={16}
          mr={4}
          rounded="md"
          resizeMode="cover"
          alt="Imagem do exercício"
          source={{ uri: 'https://www.hipertrofia.org/blog/wp-content/uploads/2014/11/remada-curvada-1.jpg' }}
        />
        <VStack flex={1}>
          <Heading fontSize="lg" color="white" fontFamily="heading">
            Remada Unilateral
          </Heading>
          <Text fontSize="sm" color="gray.200" mt={1} numberOfLines={2}>
            3 séries x 12 repetições
          </Text>
        </VStack>
        <Icon
          as={Entypo}
          color="gray.300"
          name="chevron-thin-right"
        />
      </HStack>

    </TouchableOpacity>
  )
}