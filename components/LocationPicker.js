import React, { useState, useEffect } from 'react'
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet
} from 'react-native'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'

import Colors from '../constants/Colors'
import MapPreview from './MapPreview'

function LocationPicker(props) {

  const [pickedLocation, setPickedLocation] = useState()
  const [isFetching, setIsFetching] = useState(false)

  // From the map screen where we choose a location manually
  const mapPickedLocation = props.navigation.getParam('pickedLocation')
  const { onLocationPicked } = props
  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation)
      onLocationPicked(mapPickedLocation)
    }
  }, [mapPickedLocation, onLocationPicked])

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION)
    if (result.status !== 'granted') {
      Alert.alert('Warning!', 'You must grant location permissions to use this app.', [{ text: 'OK' }])
      return false
    }
    return true
  }

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions()
    if (!hasPermission) {
      return
    }
    try {
      setIsFetching(true)
      const location = await Location.getCurrentPositionAsync({
        timeInterval: 5000
      })
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      })
      props.onLocationPicked({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      })
    } catch (err) {
      Alert.alert(
        'Could not get location!',
        'Please try again or choose a location on the map.',
        [{ text: 'OK' }]
      )
    }
    setIsFetching(false)
  }

  const pickOnMapHandler = () => {
    props.navigation.navigate('Map')
  }

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        style={styles.mapPreview}
        location={pickedLocation}
        onPress={pickOnMapHandler}
      >
        {isFetching ?
          <ActivityIndicator
            color={Colors.primary}
            size='large'
          /> :
          <Text>No location chosen yet.</Text>}
      </MapPreview>
      <View style={styles.actions}>
        <Button
          title='Current Location'
          color={Colors.primary}
          onPress={getLocationHandler}
        />
        <Button
          title='Choose On Map'
          color={Colors.primary}
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  locationPicker: {
    alignItems: 'center',
    marginBottom: 15
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 200,
    borderColor: '#ccc',
    borderWidth: 1
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  }
})

export default LocationPicker