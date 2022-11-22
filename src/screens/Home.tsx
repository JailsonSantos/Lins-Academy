import { useState } from 'react'
import { Group } from '@components/Group'
import { HStack, VStack, FlatList, Heading, Text } from 'native-base'
import { HomeHeader } from '@components/HomeHeader'
import { ExerciseCard } from '@components/ExerciseCard'

export function Home() {
  const [groupSelected, setGroupSelected] = useState('Costas');
  const [groups, setGroups] = useState(["Ombro", "Peito", "Costas", "Pernas"])
  const [exercises, setExercises] = useState(["Remada alta", "Puxador Frontal", "Agachamento Lateral", "Puxador Costas", "Leg Press"])

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()}
            onPress={() => setGroupSelected(item)}
          />
        )}
        my={10}
        maxH={10}
        horizontal
        _contentContainerStyle={{ px: 8 }}
        showsHorizontalScrollIndicator={false}
      />

      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md">
            Exercicios
          </Heading>
          <Text color="gray.200" fontSize="sm">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <ExerciseCard />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
        />

      </VStack>
    </VStack>
  )
}