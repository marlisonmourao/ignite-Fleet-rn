import { TouchableOpacityProps } from 'react-native'
import { IconProps } from 'phosphor-react-native'
import { useTheme } from 'styled-components'
import { Container } from './styles'

// eslint-disable-next-line no-undef
export type IconBoxProps = (props: IconProps) => JSX.Element

type Props = TouchableOpacityProps & {
  icon: IconBoxProps
}

export function ButtonIcon({ icon: Icon, ...rest }: Props) {
  const { colors } = useTheme()

  return (
    <Container activeOpacity={0.7} {...rest}>
      <Icon size={24} color={colors.BRAND_MID} />
    </Container>
  )
}
