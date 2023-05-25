import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.GRAY_800};
`

export const Content = styled.View`
  flex: 1;
  padding: 0 32px;
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.GRAY_400};
  font-size: ${({ theme }) => theme.font_size.MD}px;
  font-family: ${({ theme }) => theme.font_family.BOLD};

  margin-bottom: 12px;
`

export const Label = styled.Text`
  color: ${({ theme }) => theme.colors.GRAY_400};
  font-size: ${({ theme }) => theme.font_size.SM}px;
  font-family: ${({ theme }) => theme.font_family.REGULAR};

  margin-top: 32px;
  text-align: center;
`
