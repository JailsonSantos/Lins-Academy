import { useState } from 'react'
import { Group } from '@components/Group'
import { HStack, VStack } from 'native-base'
import { HomeHeader } from '@components/HomeHeader'

export function Home() {
  const [groupSelected, setGroupSelected] = useState('Costas');

  return (
    <VStack flex={1}>
      <HomeHeader />
      <HStack>
        <Group
          name="Ombro"
          isActive={groupSelected === "Ombro"}
          onPress={() => setGroupSelected("Ombro")}
        />
        <Group
          name="Costas"
          isActive={groupSelected === "Costas"}
          onPress={() => setGroupSelected("Costas")}
        />
        <Group
          name="Pernas"
          isActive={groupSelected === "Pernas"}
          onPress={() => setGroupSelected("Pernas")}
        />
      </HStack>
    </VStack>
  )
}