import styled from 'styled-components/native'

export const Container = styled.ImageBackground`
  flex: 1;
  justify-content: center;
  padding: 52px;
  background-color: ${({ theme }) => theme.colors.GRAY_800};
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.BRAND_LIGHT};
  font-size: ${({ theme }) => theme.font_size.XXXL}px;
  font-family: ${({ theme }) => theme.font_family.BOLD};

  text-align: center;
`

export const Slogan = styled.Text`
  color: ${({ theme }) => theme.colors.GRAY_100};
  font-size: ${({ theme }) => theme.font_size.MD}px;
  font-family: ${({ theme }) => theme.font_family.REGULAR};

  text-align: center;
  margin-bottom: 32px;
`
