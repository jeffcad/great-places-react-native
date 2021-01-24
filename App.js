import React from 'react'
import { View, StatusBar } from 'react-native'

import Colors from './constants/Colors'

function App() {
  return (
    <View>
      <StatusBar
        barStyle='light-content'
        backgroundColor={Colors.primary}
      />
    </View>
  )
}

export default App
