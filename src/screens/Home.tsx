import { VStack, Center, Text } from 'native-base'
import { HomeHeader } from '@components/HomeHeader'

export function Home() {
  return (
    <VStack flex={1}>
      <HomeHeader />
    </VStack>
  )
}