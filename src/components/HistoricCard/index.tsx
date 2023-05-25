import { TouchableOpacityProps } from 'react-native'
import { Check, ClockClockwise } from 'phosphor-react-native'
import { useTheme } from 'styled-components'
import { Container, Departure, Info, LicensePlate } from './styles'

export type HistoricCardProps = {
  id: string
  licensePlate: string
  created_at: string
  isSync: boolean
}

type Props = TouchableOpacityProps & {
  data: HistoricCardProps
}

export function HistoricCard({ data, ...rest }: Props) {
  const { colors } = useTheme()

  return (
    <Container activeOpacity={0.7} {...rest}>
      <Info>
        <LicensePlate>{data.licensePlate}</LicensePlate>

        <Departure>{data.created_at}</Departure>
      </Info>

      {data.isSync ? (
        <Check size={24} color={colors.BRAND_LIGHT} />
      ) : (
        <ClockClockwise size={24} color={colors.GRAY_400} />
      )}
    </Container>
  )
}
