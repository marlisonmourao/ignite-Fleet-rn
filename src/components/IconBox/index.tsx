import React from 'react'
import { Container, SizeProps } from './styles'
import { IconProps } from 'phosphor-react-native'
import { useTheme } from 'styled-components'

export type IconBoxProps = (props: IconProps) => JSX.Element

type Props = {
  size?: SizeProps
  icon: IconBoxProps
}

export function IconBox({ size = 'NORMAL', icon: Icon }: Props) {
  const iconSize = size === 'NORMAL' ? 24 : 16
  const { colors } = useTheme()

  return (
    <Container size={size}>
      <Icon size={iconSize} color={colors.BRAND_LIGHT} />
    </Container>
  )
}
