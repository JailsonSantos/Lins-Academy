import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { useCallback, useState } from 'react'
import { HistoryCard } from '@components/HistoryCard'
import { ScreenHeader } from '@components/ScreenHeader'
import { HistoryByDayDTO } from '@dtos/HistoryByDayDTO'
import { useFocusEffect } from '@react-navigation/native'
import { Heading, VStack, SectionList, Text, useToast, Center } from 'native-base'
import { Loading } from '@components/Loading'
import { useAuth } from '@hooks/useAuth'

export function History() {

  const toast = useToast();
  const { refreshedToken } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([]);

  async function fetchHistory() {
    try {
      setIsLoading(true);

      const response = await api.get('/history');
      setExercises(response.data);

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível carregar o histórico.';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })

    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(useCallback(() => {
    fetchHistory();
  }, [refreshedToken]))

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de exércicios" />
      {
        isLoading ? <Loading /> :

          exercises?.length > 0 ?

            <SectionList
              px={8}
              sections={exercises}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <HistoryCard data={item} />
              )}
              renderSectionHeader={({ section }) => (
                <Heading color="gray.100" fontSize="md" fontFamily="heading" mt={10} mb={3}>
                  {section.title}
                </Heading>
              )}
              contentContainerStyle={exercises.length === 0 && { flex: 1, justifyContent: 'center' }}
              showsVerticalScrollIndicator={false}
            />

            :

            <Center flex={1}>
              <Text color="gray.100" textAlign="center">
                Não há exercícios registrados ainda. {'\n'}
                Vamos começar agora?
              </Text>
            </Center>
      }

    </VStack>
  )
}