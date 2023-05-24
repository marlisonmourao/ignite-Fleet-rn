import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@libs/realm'

import { Container, Content } from './styles'

import { CarStatus } from '@components/CarStatus'
import { Header } from '@components/Header'

import { Historic } from '@libs/realm/schemas/Historic'
import { Alert } from 'react-native'

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null)

  const navigation = useNavigation()

  const historic = useQuery(Historic)

  function handleRegisterMovement() {
    navigation.navigate('departure')
  }

  function handleFechVehicle() {
    try {
      const vehicle = historic.filtered("status = 'departure'")[0]
      setVehicleInUse(vehicle)
    } catch (error) {
      console.log(error)
      Alert.alert(
        'Veículo em uso',
        'Não foi possível carregar o veículo em uso.',
      )
    }
  }

  useEffect(() => {
    handleFechVehicle()
  }, [])

  return (
    <Container>
      <Header />

      <Content>
        <CarStatus
          onPress={handleRegisterMovement}
          licensePlate={vehicleInUse?.license_plate}
        />
      </Content>
    </Container>
  )
}
