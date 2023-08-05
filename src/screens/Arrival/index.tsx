import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { X } from 'phosphor-react-native'
import { LatLng } from 'react-native-maps'
import { BSON } from 'realm'

import {
  AsyncMessage,
  Container,
  Content,
  Description,
  Footer,
  Label,
  LicensePlate,
} from './styles'

import { HeaderDeparture } from '@components/HeaderDeparture'
import { ButtonIcon } from '@components/ButtonIcon'
import { Button } from '@components/Button'
import { Map } from '@components/Map'

import { useObject, useRealm } from '@libs/realm'
import { Historic } from '@libs/realm/schemas/Historic'
import { getLastSyncTimestamp } from '@libs/asyncStorage/syncStorage'
import { stopLocationTask } from '../../tasks/backgroundTaskLocation'
import { getStorageLocation } from '@libs/asyncStorage/locationStorage'

type RouteParamsProps = {
  id: string
}

export function Arrival() {
  const [dataNotSynced, setDataNotSynced] = useState(false)
  const [coordinates, setCoordinates] = useState<LatLng[]>([])
  const router = useRoute()

  const { id } = router.params as RouteParamsProps

  const historic = useObject(Historic, new BSON.UUID(id))
  const realm = useRealm()
  const { goBack } = useNavigation()

  const title = historic?.status === 'departure' ? 'Chegada' : 'Detalhes'

  function handleRemoveVehicleUsage() {
    Alert.alert('Cancelar', 'Cancelar a utilização do veículo?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () => removeVehicleUsage(),
      },
    ])
  }

  async function removeVehicleUsage() {
    realm.write(() => {
      realm.delete(historic)
    })
    await stopLocationTask()

    goBack()
  }

  async function ArrivalRegister() {
    try {
      if (!historic) {
        return Alert.alert(
          'Erro',
          'Não foi possível obter os dados para chegada do veículo..',
        )
      }

      realm.write(() => {
        historic.status = 'arrival'
        historic.updated_at = new Date()
      })

      await stopLocationTask()

      Alert.alert('Chegada', 'Chegada registrada com sucesso!')
      goBack()
    } catch (error) {
      console.log(error)
      Alert.alert('Erro', 'Ocorreu um erro ao registrar a chegada do veículo.')
    }
  }

  async function getLocationInfo() {
    const lastSync = await getLastSyncTimestamp()
    const updatedAt = historic!.updated_at.getTime()
    setDataNotSynced(updatedAt > lastSync!)

    const locationsStorage = await getStorageLocation()
    setCoordinates(locationsStorage)
  }

  useEffect(() => {
    getLocationInfo()
  }, [historic])

  return (
    <Container>
      <HeaderDeparture title={title} />

      {coordinates.length > 0 && <Map coordinates={coordinates} />}

      <Content>
        <Label>Placa do veículo</Label>

        <LicensePlate>{historic?.license_plate}</LicensePlate>

        <Label>Finalidade</Label>

        <Description>{historic?.description}</Description>
      </Content>

      {historic?.status === 'departure' && (
        <Footer>
          <ButtonIcon icon={X} onPress={handleRemoveVehicleUsage} />
          <Button title="Registrar Chegada" onPress={ArrivalRegister} />
        </Footer>
      )}

      {dataNotSynced && (
        <AsyncMessage>
          Sicronização da{' '}
          {historic?.status === 'departure' ? 'saída' : 'chegada'} pendente
        </AsyncMessage>
      )}
    </Container>
  )
}
