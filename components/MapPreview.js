import React from 'react'
import {
  View,
  Image,
  StyleSheet
} from 'react-native'

import { API_KEY } from '../noGithub'

function MapPreview(props) {

  let imagePreviewUrl

  if (props.location) {
    const { lat, lng } = props.location
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${lat},${lng}&key=${API_KEY}`
  }

  return (
    <View style={{ ...styles.mapPreview, ...props.style }}>
      {props.location ?
        <Image
          style={styles.mapImage}
          source={{ uri: imagePreviewUrl }}
        /> :
        props.children
      }
    </View>
  )

}

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  mapImage: {
    width: '100%',
    height: '100%'
  }
})

export default MapPreview