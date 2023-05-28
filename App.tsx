import 'react-native-get-random-values'
import './src/libs/dayjs'

import { StatusBar } from 'react-native'
import { WifiSlash } from 'phosphor-react-native'
import { ThemeProvider } from 'styled-components/native'
import { AppProvider, UserProvider } from '@realm/react'
import { useNetInfo } from '@react-native-community/netinfo'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import theme from './src/theme'
import { REAL_APP_ID } from '@env'

import { Signin } from '@screens/Signin'
import { Loading } from '@components/Loading'
import { Routes } from '@routes/index'

import { RealmProvider, syncConfig } from './src/libs/realm'
import { TopMessage } from '@components/TopMessage'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })

  const netInfo = useNetInfo()

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <AppProvider id={REAL_APP_ID}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider
          style={{ flex: 1, backgroundColor: theme.colors.GRAY_800 }}
        >
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />

          {!netInfo.isConnected && (
            <TopMessage title="Você está off-line." icon={WifiSlash} />
          )}

          <UserProvider fallback={Signin}>
            <RealmProvider sync={syncConfig} fallback={Loading}>
              <Routes />
            </RealmProvider>
          </UserProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </AppProvider>
  )
}
