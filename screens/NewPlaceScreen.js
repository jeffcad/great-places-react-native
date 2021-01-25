import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Button,
  StyleSheet
} from 'react-native'

import * as placesActions from '../store/actions'
import Colors from '../constants/Colors'
import ImagePicker from '../components/ImagePicker'
import LocationPicker from '../components/LocationPicker'

function NewPlaceScreen(props) {

  const [titleValue, setTitleValue] = useState('')
  const [selectedImage, setselectedImage] = useState()
  const [selectedLocation, setSelectedLocation] = useState()

  const dispatch = useDispatch()

  const titleChangeHandler = (text) => {
    setTitleValue(text)
  }

  const imageTakenHandler = (imagePath) => {
    setselectedImage(imagePath)
  }

  const locationPickedHandler = useCallback((location) => {
    setSelectedLocation(location)
  }, [])

  const savePlaceHandler = () => {
    dispatch(placesActions.addPlace(
      titleValue,
      selectedImage,
      selectedLocation
    ))
    props.navigation.goBack()
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={titleValue}
          keyboardType='default'
          autoCapitalize='words'
        />
        <ImagePicker
          onImageTaken={imageTakenHandler}
        />
        <LocationPicker
          navigation={props.navigation}
          onLocationPicked={locationPickedHandler}
        />
        <View style={styles.buttonContainer}>
          <Button
            title='Save Place'
            color={Colors.accent}
            onPress={savePlaceHandler}
          />
        </View>
      </View>
    </ScrollView >
  )
}

NewPlaceScreen.navigationOptions = {
  headerTitle: 'Add a New Place'
}

const styles = StyleSheet.create({
  form: {
    margin: 30
  },
  label: {
    fontSize: 18,
    marginBottom: 15
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center'
  }
})

export default NewPlaceScreen