import { useRef, useState } from 'react'
import {
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native'
import { Container, Content } from './styles'

import { Button } from '@components/Button'
import { TextArea } from '@components/TextArea'
import { HeaderDeparture } from '@components/HeaderDeparture'
import { LicensePlateInput } from '@components/LicensePlateInput'
import { licensePlateValidate } from '@utils/licensePlateValidate'

const keyboardAvoidingViewBehavior =
  Platform.OS === 'android' ? 'height' : 'position'

export function Departure() {
  const [description, setDescription] = useState('')
  const [licensePlate, setLicensePlate] = useState('')

  const descriptionRef = useRef<TextInput>(null)
  const licensePlateRef = useRef<TextInput>(null)

  function handleDepartureRegister() {
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

            <Button title="Registrar Saída" onPress={handleDepartureRegister} />
          </Content>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  )
}
