import styled from 'styled-components/native'

export const Container = styled.TouchableOpacity`
  flex: 1;
  min-height: 56px;
  max-height: 56px;

  border-radius: 6px;

  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.BRAND_MID};
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.WHITE};
  font-size: ${({ theme }) => theme.font_size.MD}px;
  font-family: ${({ theme }) => theme.font_family.BOLD};
`

export const Load = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.colors.WHITE,
}))``
