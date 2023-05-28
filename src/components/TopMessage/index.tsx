import { IconBoxProps } from '@components/ButtonIcon'
import { Container, Title } from './styles'
import { useTheme } from 'styled-components/native'

type Props = {
  title: string
  icon?: IconBoxProps
}

export function TopMessage({ title, icon: Icon }: Props) {
  const { colors } = useTheme()

  return (
    <Container>
      {Icon && <Icon size={18} color={colors.GRAY_100} />}

      <Title>{title}</Title>
    </Container>
  )
}
