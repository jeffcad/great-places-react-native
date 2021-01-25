import * as FileSystem from 'expo-file-system'

import { insertPlace, fetchPlaces, deletePlace } from '../helpers/db'
import { API_KEY } from '../noGithub'

export const ADD_PLACE = 'ADD_PLACE'
export const SET_PLACES = 'SET_PLACES'
export const REMOVE_PLACE = 'REMOVE_PLACE'

export const addPlace = (title, image, location) => {
  return async (dispatch) => {

    const { lat, lng } = location
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`)
    if (!response.ok) {
      throw new Error('Oops, something went wrong!')
    }
    const resData = await response.json()
    if (!resData.results) {
      throw new Error('Oops, something went wrong!')
    }
    const address = resData.results[0].formatted_address

    const fileName = image.split('/').pop()
    const newPath = FileSystem.documentDirectory + fileName

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath
      })
      const dbResult = await insertPlace(
        title,
        newPath,
        address,
        lat,
        lng
      )
      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: dbResult.insertId,
          title,
          image: newPath,
          address,
          coords: { lat, lng }
        }
      })
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchPlaces()

      dispatch({
        type: SET_PLACES,
        places: dbResult.rows._array
      })
    } catch (err) {
      throw err
    }
  }
}

export const removePlace = (idToDelete) => {
  return async (dispatch) => {
    try {
      await deletePlace(idToDelete)

      dispatch({
        type: REMOVE_PLACE,
        idToDelete
      })
    } catch (err) {
      throw err
    }
  }
}