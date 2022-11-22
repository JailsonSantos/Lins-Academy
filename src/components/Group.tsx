import { Text, Pressable, IPressableProps } from "native-base";

type Props = IPressableProps & {
  name: string;
  isActive: boolean;
}
export function Group({ name, isActive, ...rest }: Props) {
  return (
    <Pressable
      mr={3}
      w={24}
      h={10}
      rounded="md"
      bg="gray.600"
      overflow="hidden"
      alignItems="center"
      justifyContent="center"
      isPressed={isActive}
      _pressed={{
        borderColor: "green.500",
        borderWidth: 1
      }}
      {...rest}>

      <Text
        fontSize="xs"
        fontWeight="bold"
        textTransform="uppercase"
        color={isActive ? "green.500" : "gray.200"}
      >
        {name}
      </Text>
    </Pressable>
  )
}