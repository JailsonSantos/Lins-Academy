import { Button as NativeBaseButton, IButtonProps, Text } from 'native-base'

type Props = IButtonProps & {
  title: string;
}

export function Button({ title, variant, ...rest }: Props) {
  return (
    <NativeBaseButton
      h={14}
      w="full"
      rounded="full"
      borderColor="green.500 "
      borderWidth={variant === "outline" ? 1 : 0}
      bg={variant === "outline" ? "transparent" : "green.700"}
      _pressed={{
        bg: variant === "outline" ? "gray.500" : "green.500"
      }}
      {...rest}
    >
      <Text
        fontSize="sm"
        fontFamily="heading"
        color={variant === "outline" ? "green.500" : "white"}
      >{title}</Text>
    </NativeBaseButton>
  )
}