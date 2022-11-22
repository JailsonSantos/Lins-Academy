import { useState } from 'react'
import { HistoryCard } from '@components/HistoryCard'
import { ScreenHeader } from '@components/ScreenHeader'
import { Heading, VStack, SectionList } from 'native-base'


export function History() {
  const [exercises, setExercises] = useState([
    {
      title: "26.11.2022",
      data: ["Puxada Frontal", "Supino Peito"]
    }, {
      title: "29.11.2022",
      data: ["Agachamento", "Ombro"]
    },
  ])

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de exércicios" />

      <SectionList
        px={8}
        sections={exercises}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <HistoryCard />
        )}
        renderSectionHeader={({ section }) => (
          <Heading color="gray.100" fontSize="md" mt={10} mb={3}>
            {section.title}
          </Heading>
        )}
      />


    </VStack>
  )
}