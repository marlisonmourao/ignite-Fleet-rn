import styled from 'styled-components/native'

export const Container = styled.View`
  width: 100%;
  padding: 0 32px 24px;
  flex-direction: row;
  justify-content: space-between;

  background-color: ${({ theme }) => theme.colors.GRAY_700};
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.GRAY_100};
  font-size: ${({ theme }) => theme.font_size.XL}px;
  font-family: ${({ theme }) => theme.font_family.BOLD};
`
