import { HistoryDTO } from "@dtos/HistoryDTO";
import { Heading, HStack, VStack, Text } from "native-base";

type Props = {
  data: HistoryDTO;
}

export function HistoryCard({ data }: Props) {
  return (
    <HStack
      px={5}
      py={4}
      mb={3}
      w="full"
      rounded="md"
      bg="gray.600"
      alignItems="center"
      justifyContent="space-between"
    >
      <VStack mr={5}>
        <Heading
          color="white"
          fontSize="md"
          numberOfLines={1}
          fontFamily="heading"
          textTransform="capitalize"
        >
          {data.group}
        </Heading>

        <Text color="gray.100" fontSize="lg" numberOfLines={1}>
          {data.name}
        </Text>
      </VStack>

      <Text color="gray.300" fontSize="md">
        {data.hour}
      </Text>
    </HStack>
  )
}