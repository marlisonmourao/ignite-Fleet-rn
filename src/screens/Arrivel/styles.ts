import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.GRAY_800};
`

export const Content = styled.View`
  flex-grow: 1;
  padding: 32px;
`

export const Label = styled.Text`
  color: ${({ theme }) => theme.colors.GRAY_300};
  font-size: ${({ theme }) => theme.font_size.SM}px;
  font-family: ${({ theme }) => theme.font_family.REGULAR};

  margin-top: 32px;
  margin-bottom: 5px;
`

export const LicensePlate = styled.Text`
  color: ${({ theme }) => theme.colors.GRAY_100};
  font-size: ${({ theme }) => theme.font_size.XXXL}px;
  font-family: ${({ theme }) => theme.font_family.BOLD};
`

export const Description = styled.Text`
  color: ${({ theme }) => theme.colors.GRAY_100};
  font-size: ${({ theme }) => theme.font_size.MD}px;
  font-family: ${({ theme }) => theme.font_family.REGULAR};

  text-align: justify;
`

export const Footer = styled.View`
  width: 100%;
  flex-direction: row;
  gap: 16px;

  margin-top: 32px;
  padding: 32px;
`
