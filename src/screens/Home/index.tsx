import { useNavigation } from '@react-navigation/native'
import { CarStatus } from '@components/CarStatus'
import { Container, Content } from './styles'

import { Header } from '@components/Header'

export function Home() {
  const navigation = useNavigation()

  function handleRegisterMovement() {
    navigation.navigate('departure')
  }

  return (
    <Container>
      <Header />

      <Content>
        <CarStatus onPress={handleRegisterMovement} />
      </Content>
    </Container>
  )
}
