import { ADD_PLACE, SET_PLACES } from './actions'
import Place from '../models/place'

const initialState = {
  places: []
}

const placesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      const newPlace = new Place(
        action.placeData.id.toString(),
        action.placeData.title,
        action.placeData.image
      )
      return {
        ...state,
        places: state.places.concat(newPlace)
      }
    case SET_PLACES:
      return {
        ...state,
        places: action.places.map(place =>
          new Place(
            place.id.toString(),
            place.title,
            place.imageUri
          )
        )
      }
    default:
      return state
  }
}

export default placesReducer