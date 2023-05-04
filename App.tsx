import { StatusBar } from 'react-native'
import { ThemeProvider } from 'styled-components/native'
import { AppProvider, UserProvider } from '@realm/react'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import theme from './src/theme'
import { REAL_APP_ID } from '@env'

import { Signin } from '@screens/Signin'
import { Home } from '@screens/Home'
import { Loading } from '@components/Loading'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <AppProvider id={REAL_APP_ID}>
      <ThemeProvider theme={theme}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <UserProvider fallback={Signin}>
          <Home />
        </UserProvider>
      </ThemeProvider>
    </AppProvider>
  )
}
