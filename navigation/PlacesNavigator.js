import { Platform } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

// Screens
import PlacesListScreen from '../screens/PlacesListScreen'
import PlacesDetailScreen from '../screens/PlaceDetailScreen'
import NewPlaceScreen from '../screens/NewPlaceScreen'
import MapScreen from '../screens/MapScreen'

import Colors from '../constants/Colors'

const PlacesNavigator = createStackNavigator({
  Places: PlacesListScreen,
  PlaceDetail: PlacesDetailScreen,
  NewPlace: NewPlaceScreen,
  Map: MapScreen
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'ios' ? '' : Colors.primary
    },
    headerTintColor: Platform.OS === 'ios' ? Colors.primary : 'white'
  }
})

export default createAppContainer(PlacesNavigator)