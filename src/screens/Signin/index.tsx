import { useEffect, useState } from 'react'
import { Alert } from 'react-native'

import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import { Realm, useApp } from '@realm/react'

import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from '@env'

import { Button } from '@components/Button'
import { Container, Slogan, Title } from './styles'

import backgroundImg from '@assets/background.png'

WebBrowser.maybeCompleteAuthSession()

export function Signin() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const app = useApp()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [request, response, googleSignIn] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    scopes: ['profile', 'email'],
  })

  function handleGoogleSignIn() {
    setIsAuthenticating(true)

    googleSignIn().then((response) => {
      if (response?.type !== 'success') {
        setIsAuthenticating(false)
      }
    })
  }

  useEffect(() => {
    if (response?.type === 'success') {
      if (response.authentication?.idToken) {
        const credentials = Realm.Credentials.jwt(
          response.authentication.idToken,
        )

        app
          .logIn(credentials)
          .catch(() =>
            Alert.alert(
              'Entrar',
              'Não foi possível conectar a sua conta Google.',
            ),
          )
      } else {
        Alert.alert('Entrar', 'Não foi possível conectar a sua conta Google.')
        setIsAuthenticating(false)
      }
    }
  }, [response, app])

  return (
    <Container source={backgroundImg}>
      <Title>Ignite Fleet</Title>

      <Slogan>Gestão de uso de veículos</Slogan>

      <Button
        title="Entrar com o Google"
        onPress={handleGoogleSignIn}
        isLoading={isAuthenticating}
      />
    </Container>
  )
}
