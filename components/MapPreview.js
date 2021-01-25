import React from 'react'
import {
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native'

import { API_KEY } from '../noGithub'

function MapPreview(props) {

  let imagePreviewUrl

  if (props.location) {
    const { lat, lng } = props.location
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=16&size=400x400&maptype=roadmap&markers=color:red%7Clabel:A%7C${lat},${lng}&key=${API_KEY}`
  }

  return (
    <TouchableOpacity
      style={{ ...styles.mapPreview, ...props.style }}
      onPress={props.onPress}
    >
      {props.location ?
        <Image
          style={styles.mapImage}
          source={{ uri: imagePreviewUrl }}
        /> :
        props.children
      }
    </TouchableOpacity>
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