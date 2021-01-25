import { ADD_PLACE, REMOVE_PLACE, SET_PLACES } from './actions'
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
        action.placeData.image,
        action.placeData.address,
        action.placeData.coords.lat,
        action.placeData.coords.lng
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
            place.imageUri,
            place.address,
            place.lat,
            place.lng
          )
        )
      }
    case REMOVE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => place.id !== action.idToDelete)
      }
    default:
      return state
  }
}

export default placesReducer