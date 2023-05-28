import { Dimensions } from 'react-native'
import styled from 'styled-components/native'

const dimensions = Dimensions.get('window')

export const Container = styled.View`
  width: ${dimensions.width}px;

  position: absolute;
  z-index: 1;

  background-color: ${({ theme }) => theme.colors.GRAY_500};
  padding-bottom: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.GRAY_100};
  font-size: ${({ theme }) => theme.font_size.SM}px;
  font-family: ${({ theme }) => theme.font_family.REGULAR};

  padding-left: 4px;
`
