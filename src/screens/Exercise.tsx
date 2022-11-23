import { VStack, Icon, HStack, Heading, Text, Image, Box, ScrollView } from 'native-base'
import { Feather } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRouesProps } from '@routes/app.routes'
import BodySvg from '@assets/body.svg'
import SeriesSvg from '@assets/series.svg'
import RepetitionsSvg from '@assets/repetitions.svg'
import { Button } from '@components/Button'

export function Exercise() {

  const navigation = useNavigation<AppNavigatorRouesProps>()

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <VStack flex={1}>
      <VStack px={8} bg="gray.600" pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon
            size={6}
            as={Feather}
            name="arrow-left"
            color="green.500"
          />
        </TouchableOpacity>

        <HStack justifyContent="space-between" mt={4} mb={8} alignItems="center">
          <Heading color="gray.100" fontSize="lg" fontFamily="heading" flexShrink={1}>
            Puxada Frontal
          </Heading>

          <HStack alignItems="center">
            <BodySvg />
            <Text color="gray.200" ml={1} textTransform="capitalize">
              Costas
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <ScrollView>
        <VStack p={8}>
          <Image
            h={80}
            w="full"
            mb={3}
            rounded="lg"
            resizeMode="cover"
            alt="Nome do exercício"
            source={{ uri: 'https://www.dicasdetreino.com.br/wp-content/uploads/2017/07/Tipos-de-Pegada-Treino-de-Costas.jpg' }}
          />

          <Box bg="gray.600" rounded="md" pb={4} px={4}>
            <HStack alignItems="center" justifyContent="space-around" mb={6} mt={5}>
              <HStack>
                <SeriesSvg />
                <Text color="gray.300" ml={2}>3 séries</Text>
              </HStack>
              <HStack>
                <RepetitionsSvg />
                <Text color="gray.300" ml={2}>12 repetições</Text>
              </HStack>
            </HStack>
            <Button title="Marcar como realizado" />
          </Box>

        </VStack>
      </ScrollView>

    </VStack>
  )
}