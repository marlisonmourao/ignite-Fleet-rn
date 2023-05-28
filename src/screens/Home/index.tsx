import { useEffect, useState } from 'react'
import { FlatList, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import dayjs from 'dayjs'
import { useUser } from '@realm/react'
import { useQuery, useRealm } from '@libs/realm'

import { Container, Content, Label, Title } from './styles'

import { Historic } from '@libs/realm/schemas/Historic'

import { Header } from '@components/Header'
import { CarStatus } from '@components/CarStatus'
import { HistoricCard, HistoricCardProps } from '@components/HistoricCard'

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null)
  const [vehicleHistoric, setVehicleHistoric] = useState<HistoricCardProps[]>(
    [],
  )

  const navigation = useNavigation()
  const historic = useQuery(Historic)
  const realm = useRealm()
  const user = useUser()

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
    try {
      const response = historic.filtered(
        "status = 'arrival' SORT(created_at DESC)",
      )
      const formattedHistoric = response.map((historic) => {
        return {
          id: historic._id.toString(),
          licensePlate: historic.license_plate,
          isSync: false,
          created_at: dayjs(historic.created_at).format(
            '[Saída em] DD/MM/YYYY [ás] HH:mm',
          ),
        }
      })

      setVehicleHistoric(formattedHistoric)
    } catch (error) {
      console.log(error)
      Alert.alert('Histórico', 'Não foi possível carregar o histórico')
    }
  }

  function handleHistoricDetails(id: string) {
    navigation.navigate('arrival', { id })
  }

  useEffect(() => {
    fechVehicleInUse()
  }, [])

  useEffect(() => {
    fetchHistoric()
  }, [historic])

  useEffect(() => {
    realm.addListener('change', () => fechVehicleInUse())

    return () => {
      if (realm && !realm.isClosed) {
        realm.removeListener('change', fechVehicleInUse)
      }
    }
  }, [])

  useEffect(() => {
    realm.subscriptions.update((mutableSubs, realm) => {
      const historyByUserQuery = realm
        .objects('Historic')
        .filtered(`user_id = '${user!.id}'`)

      mutableSubs.add(historyByUserQuery, { name: 'history_by_user' })
    })
  }, [realm])

  return (
    <Container>
      <Header />

      <Content>
        <CarStatus
          onPress={handleRegisterMovement}
          licensePlate={vehicleInUse?.license_plate}
        />

        <Title>Histórico</Title>

        <FlatList
          data={vehicleHistoric}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <HistoricCard
              data={item}
              onPress={() => handleHistoricDetails(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={<Label>Nenhum registro de utilização.</Label>}
        />
      </Content>
    </Container>
  )
}
