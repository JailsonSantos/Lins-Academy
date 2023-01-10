import { useEffect, useState } from 'react'
import { api } from '@services/api'
import BodySvg from '@assets/body.svg'
import SeriesSvg from '@assets/series.svg'
import { AppError } from '@utils/AppError'
import { Button } from '@components/Button'
import { Feather } from '@expo/vector-icons'
import { ExerciseDTO } from '@dtos/ExerciseDTO'
import { TouchableOpacity } from 'react-native'
import RepetitionsSvg from '@assets/repetitions.svg'
import { AppNavigatorRouesProps } from '@routes/app.routes'
import { useNavigation, useRoute } from '@react-navigation/native'
import { VStack, Icon, HStack, Heading, Text, Image, Box, ScrollView, useToast } from 'native-base'
import { Loading } from '@components/Loading'

type RouteParamsProps = {
  exerciseId: string;
}

export function Exercise() {
  const [isLoading, setIsLoading] = useState(true);
  const [sendingRegister, setSendingRegister] = useState(false);
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO);

  const route = useRoute();
  const toast = useToast();

  const { exerciseId } = route.params as RouteParamsProps;
  const navigation = useNavigation<AppNavigatorRouesProps>();

  function handleGoBack() {
    navigation.goBack();
  }

  async function fetchExerciseDetails() {
    try {
      setIsLoading(true);

      const response = await api.get(`/exercises/${exerciseId}`);
      setExercise(response.data);

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar os detalhes do exercício.';
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false);
    }
  }

  async function handleExerciseHistoryRegister() {
    try {
      setSendingRegister(true);
      await api.post('/history', { exercise_id: exerciseId });

      toast.show({
        title: 'Parabéns! Exercício registrado no seu histórico',
        placement: 'top',
        bgColor: 'green.700'
      })

      navigation.navigate('history');

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível registrar o exercício.';
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setSendingRegister(false);
    }
  }

  useEffect(() => {
    fetchExerciseDetails();
  }, [exerciseId]);

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
            {exercise.name}
          </Heading>

          <HStack alignItems="center">
            <BodySvg />
            <Text color="gray.200" ml={1} textTransform="capitalize">
              {exercise.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      {isLoading ? <Loading /> :
        <VStack p={8}>
          <Box rounded="lg" mb={3} overflow="hidden">
            <Image
              h={80}
              w="full"
              resizeMode="cover"
              alt={exercise.name}
              source={{ uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}` }}
            />
          </Box >

          <Box bg="gray.600" rounded="md" pb={4} px={4}>
            <HStack alignItems="center" justifyContent="space-around" mb={6} mt={5}>
              <HStack>
                <SeriesSvg />
                <Text color="gray.300" ml={2}>{exercise.series} séries</Text>
              </HStack>
              <HStack>
                <RepetitionsSvg />
                <Text color="gray.300" ml={2}>{exercise.repetitions} repetições</Text>
              </HStack>
            </HStack>
            <Button
              isLoading={sendingRegister}
              title="Marcar como realizado"
              onPress={handleExerciseHistoryRegister}
            />
          </Box>

        </VStack>
      }
    </VStack>
  )
}