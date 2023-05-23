import styled from 'styled-components/native'

export const Container = styled.View`
  width: 100%;
  padding: 16px;
  border-radius: 6px;

  background-color: ${({ theme }) => theme.colors.GRAY_700};
`

export const Label = styled.Text`
  color: ${({ theme }) => theme.colors.GRAY_300};
  font-size: ${({ theme }) => theme.font_size.SM}px;
  font-family: ${({ theme }) => theme.font_family.REGULAR};
`

export const Input = styled.TextInput`
  color: ${({ theme }) => theme.colors.GRAY_200};
  font-size: ${({ theme }) => theme.font_size.XXXL}px;
  font-family: ${({ theme }) => theme.font_family.BOLD};

  text-align: center;
  margin-top: 16px;
`
