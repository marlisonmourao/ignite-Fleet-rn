import theme from '../../theme'
import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.GRAY_800};
`

export const LoadIndicator = styled.ActivityIndicator.attrs(() => ({
  color: theme.colors.BRAND_LIGHT,
}))``
