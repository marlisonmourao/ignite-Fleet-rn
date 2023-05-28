import { IconBoxProps } from '@components/ButtonIcon'
import { Container, Title } from './styles'
import { useTheme } from 'styled-components/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type Props = {
  title: string
  icon?: IconBoxProps
}

export function TopMessage({ title, icon: Icon }: Props) {
  const { colors } = useTheme()
  const insets = useSafeAreaInsets()

  const paddingTop = insets.top - 10

  return (
    <Container style={{ paddingTop }}>
      {Icon && <Icon size={18} color={colors.GRAY_100} />}

      <Title>{title}</Title>
    </Container>
  )
}
