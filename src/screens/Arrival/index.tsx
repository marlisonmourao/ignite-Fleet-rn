import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { X } from 'phosphor-react-native'
import { LatLng } from 'react-native-maps'
import { BSON } from 'realm'
import dayjs from 'dayjs'

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
import { Locations } from '@components/Locations'
import { Button } from '@components/Button'
import { Map } from '@components/Map'

import { useObject, useRealm } from '@libs/realm'
import { Historic } from '@libs/realm/schemas/Historic'
import { getLastSyncTimestamp } from '@libs/asyncStorage/syncStorage'
import { stopLocationTask } from '../../tasks/backgroundTaskLocation'
import { getStorageLocation } from '@libs/asyncStorage/locationStorage'
import { getAddressLocation } from '@utils/getAddressLocation'
import { LocationInfoProps } from '@components/LocationInfo'
import { Loading } from '@components/Loading'

type RouteParamsProps = {
  id: string
}

export function Arrival() {
  const [dataNotSynced, setDataNotSynced] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [coordinates, setCoordinates] = useState<LatLng[]>([])
  const [departure, setDeparture] = useState<LocationInfoProps>(
    {} as LocationInfoProps,
  )
  const [arrival, setArrival] = useState<LocationInfoProps | null>(null)
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

  async function handleArrivalRegister() {
    try {
      if (!historic) {
        return Alert.alert(
          'Erro',
          'Não foi possível obter os dados para chegada do veículo..',
        )
      }

      const locations = await getStorageLocation()

      realm.write(() => {
        historic.status = 'arrival'
        historic.updated_at = new Date()
        historic.coords.push(...locations)
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
    if (!historic) {
      return
    }

    const lastSync = await getLastSyncTimestamp()
    const updatedAt = historic!.updated_at.getTime()
    setDataNotSynced(updatedAt > lastSync!)

    if (historic?.status === 'departure') {
      const locationsStorage = await getStorageLocation()
      setCoordinates(locationsStorage)
    } else {
      setCoordinates(historic?.coords ?? [])
    }

    if (historic?.coords[0]) {
      const departureStreetName = await getAddressLocation(historic?.coords[0])
      setDeparture({
        label: `Saindo em ${departureStreetName ?? ''}`,
        description: dayjs(new Date(historic?.coords[0].timestamp)).format(
          'DD/MM/YYYY [às] HH:mm',
        ),
      })
    }

    if (historic?.status === 'arrival') {
      const lastLocation = historic?.coords[historic.coords.length - 1]
      const arrivalStreetName = await getAddressLocation(lastLocation)

      setArrival({
        label: `Chegando em ${arrivalStreetName ?? ''}`,
        description: dayjs(new Date(lastLocation.timestamp)).format(
          'DD/MM/YYYY [às] HH:mm',
        ),
      })
    }

    setIsLoading(false)
  }

  useEffect(() => {
    getLocationInfo()
  }, [historic])

  if (isLoading) {
    return <Loading />
  }

  return (
    <Container>
      <HeaderDeparture title={title} />

      {coordinates.length > 0 && <Map coordinates={coordinates} />}

      <Content>
        <Locations departure={departure} arrival={arrival} />

        <Label>Placa do veículo</Label>

        <LicensePlate>{historic?.license_plate}</LicensePlate>

        <Label>Finalidade</Label>

        <Description>{historic?.description}</Description>
      </Content>

      {historic?.status === 'departure' && (
        <Footer>
          <ButtonIcon icon={X} onPress={handleRemoveVehicleUsage} />
          <Button title="Registrar Chegada" onPress={handleArrivalRegister} />
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
