import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform
} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import Colors from '../constants/Colors'
import CustomHeaderButton from '../components/HeaderButton'

function PlacesListScreen(props) {
  return (
    <View>
      <StatusBar
        barStyle='light-content'
        backgroundColor={Colors.primary}
      />
      <Text>Places List Screen</Text>
    </View>
  )
}

PlacesListScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'All Places',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Add Place'
          iconName={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
          onPress={() => navData.navigation.navigate('NewPlace')}
        />
      </HeaderButtons>
    )
  }
}

const styles = StyleSheet.create({

})

export default PlacesListScreen