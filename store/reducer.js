import { ADD_PLACE } from './actions'
import Place from '../models/place'

const initialState = {
  places: []
}

const placesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      const newPlace = new Place(
        new Date().getTime().toString(),
        action.placeData.title,
        action.placeData.image
      )
      return {
        ...state,
        places: state.places.concat(newPlace)
      }
    default:
      return state
  }
}

export default placesReducer