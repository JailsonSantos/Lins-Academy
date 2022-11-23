import { Input as NativeBaseInput, IInputProps, FormControl } from 'native-base'

type Props = IInputProps & {
  errorMessage?: string | null;
}

export function Input({ errorMessage = null, isInvalid, ...rest }: Props) {

  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={invalid} mb={4}>
      <NativeBaseInput
        h={14}
        px={4}
        bg="gray.700"
        color="white"
        fontSize="md"
        borderWidth={0}
        fontFamily="body"
        isInvalid={invalid}
        _invalid={{
          borderWidth: 1,
          borderColor: "red.500"
        }}
        placeholderTextColor="gray.300"
        rounded="full"
        _focus={{
          bg: "gray.700",
          borderWidth: 1,
          borderColor: "green.500"
        }}
        {...rest}
      />
      <FormControl.ErrorMessage _text={{ color: "red.500" }}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  )
}