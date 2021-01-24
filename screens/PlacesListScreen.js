import React from 'react'
import { useSelector } from 'react-redux'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  FlatList
} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import CustomHeaderButton from '../components/HeaderButton'
import PlaceItem from '../components/PlaceItem'

function PlacesListScreen(props) {

  const places = useSelector(state => state.places.places)

  return (
    <View>
      <FlatList
        data={places}
        keyExtractor={item => item.id}
        renderItem={itemData =>
          <PlaceItem
            title={itemData.item.title}
            address={'Test address'}
            image={itemData.item.imageUri}
            onSelect={() =>
              props.navigation.navigate('PlaceDetail', {
                placeTitle: itemData.item.title,
                placeId: itemData.item.id
              })
            }
          />
        }
      />
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