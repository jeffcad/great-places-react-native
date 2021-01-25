import React from 'react'
import { StatusBar } from 'react-native'
import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'

import PlacesNavigator from './navigation/PlacesNavigator'
import placesReducer from './store/reducer'
import Colors from './constants/Colors'
import { init } from './helpers/db'

// Initialise the database
init()
  .then(() => console.log('Initialised database.'))
  .catch(err => {
    console.log('Initialising db failed.')
    console.log(err)
  })

const rootReducer = combineReducers({
  places: placesReducer
})
const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

function App() {
  return (
    <Provider store={store}>
      <StatusBar
        barStyle='light-content'
        backgroundColor={Colors.primary}
      />
      <PlacesNavigator />
    </Provider>
  )
}

export default App
