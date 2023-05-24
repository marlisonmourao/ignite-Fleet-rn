import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useQuery, useRealm } from '@libs/realm'

import { Container, Content } from './styles'

import { CarStatus } from '@components/CarStatus'
import { Header } from '@components/Header'

import { Historic } from '@libs/realm/schemas/Historic'
import { Alert } from 'react-native'

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null)

  const navigation = useNavigation()
  const historic = useQuery(Historic)
  const realm = useRealm()

  function handleRegisterMovement() {
    if (vehicleInUse?._id) {
      return navigation.navigate('arrival', { id: vehicleInUse._id.toString() })
    }
    navigation.navigate('departure')
  }

  function fechVehicleInUse() {
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

  function fetchHistoric() {
    const response = historic.filtered(
      "status = 'arrival' SORT(created_at DESC)",
    )
    console.log(response)
  }

  useEffect(() => {
    fechVehicleInUse()
  }, [])

  useEffect(() => {
    fetchHistoric()
  }, [historic])

  useEffect(() => {
    realm.addListener('change', () => fechVehicleInUse())

    return () => realm.removeListener('change', fechVehicleInUse)
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
