import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image
} from 'react-native'

import MapPreview from '../components/MapPreview'
import Colors from '../constants/Colors'

function PlaceDetailScreen(props) {

  const selectedPlace = props.navigation.getParam('place')
  const selectedLocation = { lat: selectedPlace.lat, lng: selectedPlace.lng }

  const showMapHandler = () => {
    props.navigation.navigate('Map', {
      readonly: true,
      initialLocation: selectedLocation
    })
  }

  return (
    <ScrollView contentContainerStyle={{
      alignItems: 'center',
      backgroundColor: 'whitesmoke'
    }}
    >
      <Image
        style={styles.image}
        source={{ uri: selectedPlace.imageUri }}
      />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{selectedPlace.address}</Text>
        </View>
        <MapPreview
          location={selectedLocation}
          style={styles.mapPreview}
          onPress={showMapHandler}
        />
      </View>
    </ScrollView>
  )
}

PlaceDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam('place').title
  }
}

const styles = StyleSheet.create({
  image: {
    height: '35%',
    minHeight: 250,
    width: '100%',
    resizeMode: 'contain',
    backgroundColor: 'whitesmoke'
  },
  locationContainer: {
    marginVertical: 20,
    width: '90%',
    maxWidth: 350,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10
  },
  addressContainer: {
    padding: 20
  },
  address: {
    color: Colors.primary,
    textAlign: 'center'
  },
  mapPreview: {
    width: '100%',
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  }
})

export default PlaceDetailScreen