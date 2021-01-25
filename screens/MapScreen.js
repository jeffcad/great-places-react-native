import React, { useState, useEffect, useCallback } from 'react'
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native'
import MapView, { Marker } from 'react-native-maps'

import Colors from '../constants/Colors'

function MapScreen(props) {

  const initialLocation = props.navigation.getParam('initialLocation')
  const readonly = props.navigation.getParam('readonly')

  const [selectedLocation, setSelectedLocation] = useState(initialLocation)

  const mapRegion = {
    latitude: initialLocation ? initialLocation.lat : 35.50,
    longitude: initialLocation ? initialLocation.lng : 139.40,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  }

  const selectLocationHandler = (event) => {
    if (readonly) {
      return
    }
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude
    })
  }

  let markerCoorindates
  if (selectedLocation) {
    markerCoorindates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng
    }
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      // Could show alert here
      return
    }
    props.navigation.navigate('NewPlace', { pickedLocation: selectedLocation })
  }, [selectedLocation])

  useEffect(() => {
    props.navigation.setParams({ saveLocation: savePickedLocationHandler })
  }, [savePickedLocationHandler])

  return (
    <MapView
      style={styles.map}
      initialRegion={mapRegion}
      onPress={selectLocationHandler}
    >
      {markerCoorindates ?
        <Marker
          title='Chosen Location'
          coordinate={markerCoorindates}
        /> :
        null}
    </MapView>
  )
}

MapScreen.navigationOptions = (navData) => {
  const saveFunction = navData.navigation.getParam('saveLocation')
  const readonly = navData.navigation.getParam('readonly')
  if (readonly) {
    return {}
  }
  return {
    headerRight: () =>
      <TouchableOpacity
        style={styles.headerButton}
        onPress={saveFunction}
      >
        <Text style={styles.headerButtonText}>Save</Text>
      </TouchableOpacity>
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  headerButton: {
    marginHorizontal: 20
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === 'ios' ? Colors.primary : 'white'
  }
})

export default MapScreen