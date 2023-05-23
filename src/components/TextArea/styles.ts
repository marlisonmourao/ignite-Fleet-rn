import styled from 'styled-components/native'

export const Container = styled.View`
  width: 100%;
  padding: 16px;
  border-radius: 6px;

  background-color: ${({ theme }) => theme.colors.GRAY_700};
`

export const Label = styled.Text`
  font-size: ${({ theme }) => theme.font_size.SM}px;
  font-family: ${({ theme }) => theme.font_family.REGULAR};
  color: ${({ theme }) => theme.colors.GRAY_300};
`

export const Input = styled.TextInput`
  font-size: ${({ theme }) => theme.font_size.SM}px;
  font-family: ${({ theme }) => theme.font_family.REGULAR};
  color: ${({ theme }) => theme.colors.GRAY_200};

  vertical-align: top;
  margin-top: 16px;
`
