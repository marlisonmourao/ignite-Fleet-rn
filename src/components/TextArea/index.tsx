import { useTheme } from 'styled-components/native'
import { TextInputProps } from 'react-native'
import { Container, Input, Label } from './styles'

type Props = TextInputProps & {
  label: string
}

export function TextArea({ label, ...rest }: Props) {
  const { colors } = useTheme()

  return (
    <Container>
      <Label>{label}</Label>

      <Input
        placeholderTextColor={colors.GRAY_400}
        multiline
        autoCapitalize="sentences"
        {...rest}
      />
    </Container>
  )
}
