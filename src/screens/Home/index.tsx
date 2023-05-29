import { useEffect, useState } from 'react'
import { FlatList, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { CloudArrowDown } from 'phosphor-react-native'
import dayjs from 'dayjs'
import { useUser } from '@realm/react'
import Toask from 'react-native-toast-message'

import { Container, Content, Label, Title } from './styles'

import { Historic } from '@libs/realm/schemas/Historic'
import { useQuery, useRealm } from '@libs/realm'
import {
  getLastSyncTimestamp,
  saveLastSyncTimestamp,
} from '@libs/asyncStorage/syncStorage'

import { Header } from '@components/Header'
import { CarStatus } from '@components/CarStatus'
import { HistoricCard, HistoricCardProps } from '@components/HistoricCard'
import { TopMessage } from '@components/TopMessage'

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null)
  const [percentageToSync, setPercentageToSync] = useState<string | null>(null)
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

  async function fetchHistoric() {
    try {
      const response = historic.filtered(
        "status = 'arrival' SORT(created_at DESC)",
      )

      const lastSync = await getLastSyncTimestamp()

      const formattedHistoric = response.map((historic) => {
        return {
          id: historic._id.toString(),
          licensePlate: historic.license_plate,
          isSync: lastSync! > historic.updated_at.getTime(),
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

  async function progressNotification(
    transferred: number,
    transferable: number,
  ) {
    const percentage = (transferred / transferable) * 100

    if (percentage === 100) {
      await saveLastSyncTimestamp()
      await fetchHistoric()
      setPercentageToSync(null)

      Toask.show({
        text1: 'Todos os dados estão sincronizados',
        type: 'info',
      })
    }

    if (percentage < 100) {
      setPercentageToSync(`${percentage.toFixed(0)}% sincronizado.`)
    }
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

  useEffect(() => {
    const syncSession = realm.syncSession

    if (syncSession) {
      syncSession?.addProgressNotification(
        Realm.ProgressDirection.Upload,
        Realm.ProgressMode.ReportIndefinitely,
        progressNotification,
      )
    }

    return () => syncSession?.removeProgressNotification(progressNotification)
  }, [])

  return (
    <Container>
      {percentageToSync && (
        <TopMessage title={percentageToSync} icon={CloudArrowDown} />
      )}

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
