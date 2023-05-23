import { Key, Car } from 'phosphor-react-native'
import { TouchableOpacityProps } from 'react-native'
import { Container, IconBox, Message, TextHighlight } from './styles'
import { useTheme } from 'styled-components'

type Props = TouchableOpacityProps & {
  licensePlate?: string | null
}

export function CarStatus({ licensePlate = null, ...rest }: Props) {
  const theme = useTheme()

  const Icon = licensePlate ? Key : Car
  const message = licensePlate
    ? `Veículo ${licensePlate} em uso. `
    : `Nenhum veículo em uso. `
  const status = licensePlate ? 'chegada' : 'saída'

  return (
    <Container activeOpacity={0.7} {...rest}>
      <IconBox>
        <Icon size={32} color={theme.colors.BRAND_LIGHT} />
      </IconBox>

      <Message>
        {message}
        <TextHighlight>Clique aqui para regsiter a {status}</TextHighlight>
      </Message>
    </Container>
  )
}
