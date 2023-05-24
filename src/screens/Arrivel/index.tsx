import { Alert } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { X } from 'phosphor-react-native'
import { BSON } from 'realm'

import {
  Container,
  Content,
  Description,
  Footer,
  Label,
  LicensePlate,
} from './styles'

import { HeaderDeparture } from '@components/HeaderDeparture'
import { Button } from '@components/Button'
import { ButtonIcon } from '@components/ButtonIcon'

import { useObject, useRealm } from '@libs/realm'
import { Historic } from '@libs/realm/schemas/Historic'

type RouteParamsProps = {
  id: string
}

export function Arrivel() {
  const router = useRoute()

  const { id } = router.params as RouteParamsProps

  const historic = useObject(Historic, new BSON.UUID(id))
  const realm = useRealm()
  const { goBack } = useNavigation()

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

  function removeVehicleUsage() {
    realm.write(() => {
      realm.delete(historic)
    })

    goBack()
  }

  return (
    <Container>
      <HeaderDeparture title="Chegada" />

      <Content>
        <Label>Placa do veículo</Label>

        <LicensePlate>{historic?.license_plate}</LicensePlate>

        <Label>Finalidade</Label>

        <Description>{historic?.description}</Description>

        <Footer>
          <ButtonIcon icon={X} onPress={handleRemoveVehicleUsage} />
          <Button title="Registrar Chegada" />
        </Footer>
      </Content>
    </Container>
  )
}
