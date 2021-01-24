import React from 'react'
import { View, StatusBar } from 'react-native'

import PlacesNavigator from './navigation/PlacesNavigator'

import Colors from './constants/Colors'

function App() {
  return (
    <View>
      <StatusBar
        barStyle='light-content'
        backgroundColor={Colors.primary}
      />
      <PlacesNavigator />
    </View>
  )
}

export default App
