import styled from 'styled-components/native'

export const Container = styled.TouchableOpacity`
  width: 100%;

  background-color: ${({ theme }) => theme.colors.GRAY_700};
  padding: 20px 16px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  border-radius: 6px;
  margin-bottom: 12px;
`

export const Info = styled.View`
  flex: 1;
`

export const LicensePlate = styled.Text`
  color: ${({ theme }) => theme.colors.WHITE};
  font-size: ${({ theme }) => theme.font_size.MD}px;
  font-family: ${({ theme }) => theme.font_family.BOLD};
`

export const Departure = styled.Text`
  color: ${({ theme }) => theme.colors.GRAY_200};
  font-size: ${({ theme }) => theme.font_size.XS}px;
  font-family: ${({ theme }) => theme.font_family.REGULAR};

  margin-top: 4px;
`
