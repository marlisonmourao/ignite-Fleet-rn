import { useRef, useState } from 'react'
import {
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { useUser } from '@realm/react'

import { Container, Content } from './styles'

import { Button } from '@components/Button'
import { TextArea } from '@components/TextArea'
import { HeaderDeparture } from '@components/HeaderDeparture'
import { LicensePlateInput } from '@components/LicensePlateInput'

import { licensePlateValidate } from '@utils/licensePlateValidate'
import { Historic } from '@libs/realm/schemas/Historic'
import { useRealm } from '@libs/realm'

const keyboardAvoidingViewBehavior =
  Platform.OS === 'android' ? 'height' : 'position'

export function Departure() {
  const [description, setDescription] = useState('')
  const [licensePlate, setLicensePlate] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)

  const realm = useRealm()
  const user = useUser()
  const { goBack } = useNavigation()

  const descriptionRef = useRef<TextInput>(null)
  const licensePlateRef = useRef<TextInput>(null)

  async function handleDepartureRegister() {
    try {
      if (!licensePlateValidate(licensePlate)) {
        licensePlateRef.current?.focus()
        return Alert.alert(
          'Placa inválida',
          'A placa é inválida. Por favor, informe a placa correta do veículo.',
        )
      }

      if (description.trim().length === 0) {
        descriptionRef.current?.focus()
        return Alert.alert(
          'Finalidade',
          'Por favor, informe a finalidade da utilização do veículo.',
        )
      }

      setIsRegistering(true)

      realm.write(() => {
        realm.create(
          'Historic',
          Historic.generate({
            user_id: user!.id,
            license_plate: licensePlate.toUpperCase(),
            description,
          }),
        )
      })

      Alert.alert('Saída', 'Saída do veículo registrada com sucesso!')
      goBack()
    } catch (error) {
      console.log(error)
      Alert.alert('Error', 'Não foi possível registrar a saída do veículo.')
      setIsRegistering(false)
    }
  }

  return (
    <Container>
      <HeaderDeparture title="Saída" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={keyboardAvoidingViewBehavior}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Content>
            <LicensePlateInput
              ref={licensePlateRef}
              label="Placa do veículo"
              placeholder="BRA1234"
              onSubmitEditing={() => descriptionRef.current?.focus()}
              returnKeyType="next"
              onChangeText={setLicensePlate}
            />

            <TextArea
              ref={descriptionRef}
              label="Finalidade"
              placeholder="Vou ultilizar o veículo para..."
              onSubmitEditing={handleDepartureRegister}
              returnKeyType="send"
              onChangeText={setDescription}
              blurOnSubmit
            />

            <Button
              title="Registrar Saída"
              onPress={handleDepartureRegister}
              isLoading={isRegistering}
            />
          </Content>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  )
}
