import React, { useState } from 'react'
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

function LocationPicker(props) {

  const [pickedLocation, setPickedLocation] = useState()
  const [isFetching, setIsFetching] = useState(false)

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
    } catch (err) {
      Alert.alert(
        'Could not get location!',
        'Please try again or choose a location on the map.',
        [{ text: 'OK' }]
      )
    }
    setIsFetching(false)
  }

  return (
    <View style={styles.locationPicker}>
      <View style={styles.mapPreview}>
        {isFetching ?
          <ActivityIndicator
            color={Colors.primary}
            size='large'
          /> :
          <Text>No location chosen yet.</Text>}
      </View>
      <Button
        title='Get User Location'
        color={Colors.primary}
        onPress={getLocationHandler}
      />
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
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default LocationPicker