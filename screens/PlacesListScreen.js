import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  View,
  StyleSheet,
  Platform,
  FlatList
} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import CustomHeaderButton from '../components/HeaderButton'
import PlaceItem from '../components/PlaceItem'
import * as placesActions from '../store/actions'

function PlacesListScreen(props) {

  const places = useSelector(state => state.places.places)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(placesActions.loadPlaces())
  }, [dispatch])

  return (
    <View>
      <FlatList
        data={places}
        keyExtractor={item => item.id}
        renderItem={itemData =>
          <PlaceItem
            title={itemData.item.title}
            address={itemData.item.address}
            image={itemData.item.imageUri}
            onSelect={() =>
              props.navigation.navigate('PlaceDetail', {
                place: itemData.item
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