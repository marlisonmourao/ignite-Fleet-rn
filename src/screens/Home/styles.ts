import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.GRAY_800};
`

export const Content = styled.View`
  flex: 1;
  padding: 0 32px;
`
