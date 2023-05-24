import { forwardRef } from 'react'
import { useTheme } from 'styled-components/native'
import { TextInput, TextInputProps } from 'react-native'
import { Container, Input, Label } from './styles'

type Props = TextInputProps & {
  label: string
}

// eslint-disable-next-line react/display-name
const TextArea = forwardRef<TextInput, Props>(({ label, ...rest }, ref) => {
  const { colors } = useTheme()

  return (
    <Container>
      <Label>{label}</Label>

      <Input
        ref={ref}
        placeholderTextColor={colors.GRAY_400}
        multiline
        autoCapitalize="sentences"
        {...rest}
      />
    </Container>
  )
})

export { TextArea }
