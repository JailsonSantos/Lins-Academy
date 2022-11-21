import { Button as NativeBaseButton, IButtonProps, Text } from 'native-base'

type Props = IButtonProps & {
  title: string;
}

export function Button({ title, ...rest }: Props) {
  return (
    <NativeBaseButton
      w="full"
      h={14}
      bg="green.700"
      rounded="full"
      _pressed={{
        bg: "green.500"
      }}
    >
      <Text
        color="white"
        fontSize="sm"
        fontFamily="heading"
      >{title}</Text>
    </NativeBaseButton>
  )
}